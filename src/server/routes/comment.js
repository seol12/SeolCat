const express = require('express');
const db = require('../models');
const { loginCheck } = require('./middleware');


const router = express.Router();


router.post('/:postId', loginCheck, async(req, res, next) => { 

  try {
    const findPost = await db.Post.findOne(
      {
        where: { 
          id: req.params.postId,
        },
      },
    );
    if(!findPost) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create(
      {
        PostId: findPost.id,
        UserId: req.user.id,
        content: req.body.content,
      },
    );
    await findPost.addComment(newComment.id);
    const comment = await db.Comment.findOne(
      {
        where: {
          id: newComment.id,
        },
        include: [
          {
            model: db.User,
            attributes: ['id', 'nickname', 'profilePicture'],
          },
        ],
      }
    );
    return res.status(200).json(comment);
  }catch(e) {
    console.error(e);
    next(e);
  }
});

router.patch('/:commentId', loginCheck, async(req, res, next) => {

  try {
    const findPost = await db.Post.findOne(
      {
        where: {
          id: req.body.postId,
        },
      },
    );
    if(!findPost) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    const findComment = await db.Comment.findOne(
      {
        where: {
          id: req.params.commentId,
        },
      },
    );
    if(!findComment) {
      return res.status(404).send('댓글이 존재하지 않습니다!');
    }
    if(findComment.UserId !== req.user.id) {
      return res.status(403).send('권한이 없습니다.');
    }
    await db.Comment.update(
      {
        content: req.body.content,
      }, 
      {
        where: {
          id: req.params.commentId,
        },
      },
    );
    return res.status(200).json({ content: req.body.content });
  }catch(e) {
    console.error(e);
    next(e);
  }
  
});

router.delete('/:commentId', loginCheck, async(req, res, next) => {

  try {
    const findPost = await db.Post.findOne(
      {
        where: {
          id: req.query.postId,
        },
      },
    );
    if(!findPost) {
      return res.status(404).send('게시글이 존재하지 않습니다.');
    }
    const findComment = await db.Comment.findOne(
      {
        where: {
          id: req.params.commentId,
        },
      },
    );
    if(!findComment) {
      return res.status(404).send('댓글이 존재하지 않습니다!');
    }
    if(findComment.UserId !== req.user.id) {
      return res.status(403).send('권한이 없습니다.');
    }
    await db.Comment.destroy(
      {
        where: { 
          id: req.params.commentId,
        },
      },
    );
    return res.status(200).json({ commentId: parseInt(req.params.commentId) });
  }catch(e) {
    console.error(e);
    next(e);
  }

});


module.exports = router;