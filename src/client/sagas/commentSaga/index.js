import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import * as COMMENT_API from './commentAPI';
import * as COMMENT_ACTION from '../../actions/commentActions';


function* addComment(action) {

  try {
    const serverResponse = yield call(COMMENT_API.addCommentAPI, action.postId, action.commentContent);
    yield put({
      type: COMMENT_ACTION['ADD_COMMENT_SUCCESS'],
      responseData: {
        targetPostId: action.postId,
        newComment: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: COMMENT_ACTION['ADD_COMMENT_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요.');
    }
  }

};

function* watchAddComment() {

  yield takeLatest(COMMENT_ACTION['ADD_COMMENT_REQUEST'], addComment);

};

function* updateComment(action) {

  try {
    const serverResponse = yield call(COMMENT_API.updateCommentAPI, action.commentId, action.data);
    yield put({
      type: COMMENT_ACTION['UPDATE_COMMENT_SUCCESS'],
      responseData: {
        targetPostId: action.data.postId,
        targetCommentId: action.commentId,
        updatedContent: serverResponse.data.content,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: COMMENT_ACTION['UPDATE_COMMENT_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요.');
    }
  }
  
};

function* watchUpdateComment() {

  yield takeLatest(COMMENT_ACTION['UPDATE_COMMENT_REQUEST'], updateComment);

};

function* removeComment(action) {

  try {
    const serverResponse = yield call(COMMENT_API.removeCommentAPI, action.commentId, action.postId);
    yield put({
      type: COMMENT_ACTION['REMOVE_COMMENT_SUCCESS'],
      responseData: {
        targetPostId: action.postId,
        targetCommentId: serverResponse.data.commentId,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: COMMENT_ACTION['REMOVE_COMMENT_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요.');
    }
  }

};

function* watchRemoveComment() {

  yield takeLatest(COMMENT_ACTION['REMOVE_COMMENT_REQUEST'], removeComment);

};


export default function* commentsaga() {

  yield all([
    fork(watchAddComment),
    fork(watchRemoveComment),
    fork(watchUpdateComment),
  ]);

};