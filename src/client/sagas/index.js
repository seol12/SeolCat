import axios from 'axios';
import { all, fork } from 'redux-saga/effects';
import userSaga from './userSaga';
import postSaga from './postSaga';
import commentSaga from './commentSaga';


axios.defaults.baseURL = 'http://seolcat.com:1029/api';


export default function* rootSaga() {

  yield all([
    fork(userSaga),
    fork(postSaga),
    fork(commentSaga),
  ]);
  
};