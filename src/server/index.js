const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const dotenv = require('dotenv');
const passport = require('passport');
const passportConfig = require('./passport');
const db = require('./models');
const hpp = require('hpp');
const helmet = require('helmet');
const commentAPIRouter = require('./routes/comment');
const postAPIRouter = require('./routes/post');
const postsAPIRouter = require('./routes/posts');
const userAPIRouter = require('./routes/user');


const productionEnvironment = process.env.NODE_ENV === 'production';
dotenv.config();
const server = express();
db.sequelize.sync();
passportConfig();


if(productionEnvironment) {
  server.use(hpp());
  server.use(helmet());
  server.use(morgan('combined'));
  server.use(cors({
    origin: ['http://seolecat.com','http://www.seolecat.com'],
    credentials: true,
  }));
}else {
  server.use(morgan('dev'));
  server.use(cors({
    origin: true,
    credentials: true,
  }));
}
server.use('/', express.static('uploads'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false, 
    domain: productionEnvironment && '.seolecat.com',
  },
  name: 'didhddl',
}));
server.use(passport.initialize());
server.use(passport.session());
server.use('/api/comment', commentAPIRouter);
server.use('/api/post', postAPIRouter);
server.use('/api/posts', postsAPIRouter);
server.use('/api/user', userAPIRouter);


server.listen(productionEnvironment ? process.env.PORT : 1228, () => {

  console.log(`앙칼진 고양이 같은 서버 ON `);
  
});