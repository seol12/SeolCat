const express = require('express');
const db = require('../models');


const router = express.Router();


router.get('/mainPosts', async(req, res, next) => {

  try {
    let where = {};
    if(parseInt(req.query.lastId, 10)) {
      where.id = {
        [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), 
      };
    }
    const mainPosts = await db.Post.findAll(
      {
        where,
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
        order: [['createdAt','DESC'], ['id', 'DESC']], 
        limit: parseInt(req.query.limit, 10),
      },
    );
    return res.status(200).json(mainPosts);
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.get('/userPosts/:userNickname', async(req, res, next) => {

  try {
    const findUser = await db.User.findOne(
      {
        where: {
          nickname: req.params.userNickname,
        },
      },
    );
    let where = {
      UserId: findUser.id,
    };
    if(parseInt(req.query.lastId, 10)) {
      where.id = {
        [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), 
      };
    }
    const userPosts = await db.Post.findAll(
      {
        where,
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
        order: [['createdAt', 'DESC'], ['id', 'DESC']], 
        limit: parseInt(req.query.limit, 10),
      },
    );
    return res.status(200).json(userPosts);
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.get('/userLikedPosts/:userNickname', async(req, res, next) => {
  
  try {
    const findUser = await db.User.findOne(
      {
        where: {
          nickname: req.params.userNickname,
        },
      },
    );
    const findUserLikedPosts = await db.Post.findAll(
      {
        attributes: ['id', 'UserId'],
        include: [
          {
            model: db.User,
            as: 'PostLikers',
            where: {
              id: findUser.id,
            },
          },
        ],
      },
    );
    let where = {
      id: {
        [db.Sequelize.Op.in]: findUserLikedPosts.map(v => v.id),
      },
    };
    if(parseInt(req.query.lastId, 10)) {
      where.id = {
        [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10), 
        [db.Sequelize.Op.in]: findUserLikedPosts.map(v => v.id), 
      };
    }
    const userLikedPosts = await db.Post.findAll(
      {
        where,
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
        order: [['createdAt', 'DESC'], ['id', 'DESC']], 
        limit: parseInt(req.query.limit, 10),
      },
    );
    return res.status(200).json(userLikedPosts);
  }catch(e) {
    console.error(e);
    next(e);
  }

});

router.get('/searchPosts/:keyword', async(req, res, next) => {

  try {
    let where = {
      content: { 
        [db.Sequelize.Op.like]: "%" + req.params.keyword + "%",
      },
    };
    if(parseInt(req.query.lastId, 10)) {
      where.id = { 
        [db.Sequelize.Op.lt]: parseInt(req.query.lastId, 10),
      };
    }
    const searchPosts = await db.Post.findAll(
      {
        where,
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
              }
            ],
          },
        ],
        order: [['createdAt', 'DESC'], ['id', 'DESC']], 
        limit: parseInt(req.query.limit, 10),
      },
    );
    return res.status(200).json(searchPosts);
  }catch(e) {
    console.error(e);
    next(e);
  }

});


module.exports = router;