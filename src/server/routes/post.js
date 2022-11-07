const express = require('express');
const db = require('../models');
const path = require('path');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { loginCheck } = require('./middleware');


const router = express.Router();
AWS.config.update(
  {
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
);
const upload = multer(
  {
    storage: multerS3(
      {
        s3: new AWS.S3(),
        bucket: 'seolcat',
        key(req, file, cb) {
          cb(null, `original/postImage/${+new Date()}${path.basename(file.originalname)}`);
        },
      },
    ),
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
  },
);


router.post('/images', upload.array('image'), (req, res, next) => {

  try {
    return res.status(200).json(req.files.map(v => v.location));
  }catch(e) {
    console.error(e);
    next(e);
  }
  
});

router.post('/', loginCheck, upload.none(), async(req, res, next) => {

  try {
    const createNewPost = await db.Post.create(
      {
        content: req.body.content, 
        UserId: req.user.id,
      },
    );
    if(req.body.image) { 
      if(Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((v) => {
          return db.Image.create(
            { 
              src: v,
            },
          );
        }));
        await createNewPost.addImages(images);
      }else { 
        const image = await db.Image.create(
          {
            src: req.body.image,
          },
        );
        await createNewPost.addImage(image);
      }
    }
    const newPost = await db.Post.findOne(
      {
        where: {
          id: createNewPost.id,
        },
        include: [
          {
            model: db.User,
            attributes: ['id', 'nickname', 'profilePicture'],
          }, 
          {
            model: db.Image,
          }, 
          {
            model: db.User,
            as: 'PostLikers',
            attributes: ['id'],
          }, 
          {
            model: db.Comment,
            include: [
              {
                model: db.User,
                attributes: ['id', 'nickname', 'profilePicture'],
              },
            ],
          },
        ],
      },
    );
    return res.status(200).json(newPost);
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.get('/:postId', async(req, res, next) => {

  try {
    const singlePost = await db.Post.findOne(
      {
        where: { 
          id: req.params.postId,
        },
        include: [
          {
            model: db.User,
            attributes: ['id', 'nickname', 'profilePicture'],
          }, 
          {
            model: db.Image,
          }, 
          {
            model: db.Comment,
            include: [
              {
                model: db.User,
                attributes: ['id', 'nickname', 'profilePicture'],  
              },
            ],
          }, 
          {
            model: db.User,
            through: 'PostLike',
            as: 'PostLikers',
            attributes: ['id'],
          },
        ],
      },
    );
    if(!singlePost) {
      return res.status(404).send('게시글이 존재하지 않습니다!');
    }
    return res.status(200).json(singlePost);
  }catch(e) {
    console.error(e);
    next(e);
  }
  
});

router.patch('/:postId', loginCheck, upload.none(), async(req, res, next) => {

  try {
    
    const findPost = await db.Post.findOne(
      {
        where: {
          id: req.params.postId,
        },
      },
    );
    if(!findPost) {
      return res.status(404).send('게시글이 존재하지 않습니다!');
    }
    if(findPost.UserId !== req.user.id) {
      return res.status(403).send('권한이 없습니다!');
    }
    await db.Post.update(
      {
        content: req.body.content,
      }, 
      {
        where: {
          id: req.params.postId,
        },
      },
    );
    if(req.body.image) {
      if(Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((v) => {
          return db.Image.create(
            {
              src: v,
            },
          );
        }));
        await findPost.setImages(images);
      }else {
        const image = await db.Image.create(
          {
            src: req.body.image,
          },
        );
        await findPost.setImages(image);
      }
    }else {
      await findPost.setImages();
    }
    const updatedPost = await db.Post.findOne(
      {
        where: {
          id: req.params.postId,
        },
        include: [
          {
            model: db.User,
            attributes: ['id', 'nickname', 'profilePicture'],
          }, 
          {
            model: db.Image,
          }, 
          {
            model: db.User,
            through: 'PostLike',
            as: 'PostLikers',
            attributes: ['id'],
          }, 
          {
            model: db.Comment,
            include: [
              {
                model: db.User,
                attributes: ['id', 'nickname', 'profilePicture'],
              },
            ],
          },
        ],
      },
    );
    return res.status(200).json(updatedPost);
  }catch(e) {
    console.error(e); 
    next(e);
  }

});

router.delete('/:postId', loginCheck, async(req, res, next) => {

  try {
    const findPost = await db.Post.findOne(
      {
        where: { 
          id: req.params.postId,
        }, 
      },
    );
    if(!findPost) {
      return res.status(404).send('게시글이 존재하지 않습니다!');
    }
    if(findPost.UserId !== req.user.id) {
      return res.status(403).send('권한이 없습니다!');
    }
    await db.Post.destroy(
      {
        where: {
          id: req.params.postId, 
        },
      },
    );
    return res.status(200).json({ postId: parseInt(req.params.postId) });
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.post('/postLike/:postId', loginCheck, async(req, res, next) => {

  try {
    const findPost = await db.Post.findOne(
      {
        where: { 
          id: req.params.postId,
        },
      },
    );
    if(!findPost) {
      return res.status(404).send('게시글이 존재하지 않습니다!');
    }
    await findPost.addPostLiker(req.user.id);
    return res.status(200).json({ userId: req.user.id });
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.delete('/postLike/:postId', loginCheck, async(req, res, next) => {

  try {
    const findPost = await db.Post.findOne(
      {
        where: { 
          id: req.params.postId,
        },
      },
    );
    if(!findPost) {
      return res.status(404).send('게시글이 존재하지 않습니다!');
    }
    await findPost.removePostLiker(req.user.id);
    return res.status(200).json({ userId: req.user.id });
  }catch(e) {
    console.error(e);
    next(e);
  }

});


module.exports = router;