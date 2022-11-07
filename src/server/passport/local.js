const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../models');


module.exports = () => {

  passport.use(new LocalStrategy(
    {
      usernameField: 'userId',
      passwordField: 'password',
    },
    async(userId, password, done) => {
      try {
        const findUser = await db.User.findOne(
          {
            where: { 
              userId,
            },
          },
        );
        if(!findUser) {
          return done(null, false, { reason: '아이디 또는 비밀번호를 다시 한번 확인해 주세요!' });
        }
        const result = await bcrypt.compare(password, findUser.password);
        if(result) {
          return done(null, findUser);
        }
        return done(null, false, { reason: '아이디 또는 비밀번호를 다시 한번 확인해 주세요!' });
      }catch(e) {
        console.error(e);
        return done(e);
      }
    },
  ));

};