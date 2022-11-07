const express = require('express');
const db = require('../models');
const path = require('path');
const bcrypt = require('bcrypt');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const passport = require('passport');
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
          cb(null, `original/profileImage/${+new Date()}${path.basename(file.originalname)}`);
        },
      },
    ),
    limits: {
      fileSize: 20 * 1024 * 1024,
    },
  },
);


router.post('/image', upload.single('image'), async(req, res, next) => {
  
  try {
    return res.status(200).json(req.file.location);
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.post('/signup', async(req, res, next) => { 

  try {
    const findUser = await db.User.findOne(
      {
        where: {
          userId: req.body.userId,
        },
      },
    );
    if(findUser) {
      return res.status(409).send('이미 사용 중인 아이디입니다!');
    }
    const findNickname = await db.User.findOne(
      {
        where: {
          nickname: req.body.nickname,
        },
      },
    );
    if(findNickname) {
      return res.status(409).send('이미 사용 중인 닉네임입니다!');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12); 
    const newUser = await db.User.create(
      {
        nickname: req.body.nickname,
        userId: req.body.userId,
        password: hashedPassword,
      },
    );
    return res.status(200).send(newUser.userId);
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.post('/login', (req, res, next) => { 

  passport.authenticate('local', (error, user, info) => {
    if(error) {
      console.error(error);
      return next(error);
    }
    if(info) {
      return res.status(401).send(info.reason);
    }
    return req.login(user, async(loginError) => {
      try {
        if(loginError) {
          return next(loginError);
        }
        const fullUser = await db.User.findOne(
          {
            where: {
              id: user.id,
            },
            attributes: ['id', 'nickname', 'userId', 'profilePicture', 'profileBackground', 'bio', 'subNickname'],
          },
        );
        return res.status(200).json(fullUser);
      }catch(e) {
        console.error(e);
        next(e);
      }
    });
  })(req, res, next);

});

router.post('/logout', async(req, res, next) => { 

  try {
    req.logout();
    req.session.destroy();
    return res.status(200).send('로그아웃');
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.get('/myInformation', loginCheck, (req, res, next) => {

  try {
    const myInformation = Object.assign({}, req.user.toJSON());
    delete myInformation.password;
    return res.status(200).json(myInformation);
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.get('/userInformation/:nickname', async(req, res, next) => {

  try {
    const userInformation = await db.User.findOne(
      {
        where: { 
          nickname: req.params.nickname,
        },
        attributes: ['id', 'nickname', 'profilePicture', 'profileBackground', 'bio', 'subNickname'],
      },
    );
    return res.status(200).json(userInformation);
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.patch('/profilePicture', loginCheck,  async(req, res, next) => {

  try {
    await db.User.update(
      {
        profilePicture: req.body.profilePicture,
      }, 
      {
        where: {
          id: req.user.id,
        },
      },
    );
    return res.status(200).json({ profilePicture : req.body.profilePicture });
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.patch('/profileBackground', loginCheck, async(req, res, next) => {
  
  try {
    await db.User.update(
      {
        profileBackground: req.body.profileBackground,
      }, 
      {
        where: {
          id: req.user.id,
        },
      },
    );
    return res.status(200).json({ profileBackground: req.body.profileBackground });
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.patch('/subNickname', loginCheck, async(req, res, next) => {
  
  try {
    await db.User.update(
      {
        subNickname: req.body.subNickname,
      }, 
      {
        where: {
          id: req.user.id,
        },
      },
    );
    return res.status(200).json({ subNickname: req.body.subNickname });
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.patch('/bio', loginCheck, async(req, res, next) => {
  
  try {
    await db.User.update(
      {
        bio: req.body.bio,
      }, 
      {
        where: {
          id: req.user.id,
        },
      },
    );
    return res.status(200).json({ bio: req.body.bio });
  }catch(e) {
    console.error(e);
    next(e);
  }

});


module.exports = router;