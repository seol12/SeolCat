

exports.loginCheck = (req, res, next) => {

  if(req.isAuthenticated()) {
    next();
  }else {
    return res.status(401).send('로그인 후 이용 가능해요!');
  }
    
};