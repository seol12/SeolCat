import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import * as POST_API from './postAPI';
import * as POST_ACTION from '../../actions/postActions';


function* loadMainPosts(action) {
  
  try {
    const serverResponse = yield call(POST_API.loadMainPostsAPI, action.lastId);
    yield put({
      type: POST_ACTION['LOAD_MAIN_POSTS_SUCCESS'],
      responseData: {
        posts: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['LOAD_MAIN_POSTS_FAILURE'],
    });
  }

};

function* watchLoadMainPosts() {

  yield takeLatest(POST_ACTION['LOAD_MAIN_POSTS_REQUEST'], loadMainPosts);

};

function* loadUserPosts(action) {

  try {
    const serverResponse = yield call(POST_API.loadUserPostsAPI, action.userNickname, action.lastId);
    yield put({
      type: POST_ACTION['LOAD_USER_POSTS_SUCCESS'],
      responseData: {
        posts: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['LOAD_USER_POSTS_FAILURE'],
    });
  }
  
};

function* watchLoadUserPosts() {

  yield takeLatest(POST_ACTION['LOAD_USER_POSTS_REQUEST'], loadUserPosts);

};

function* loadUserLikedPosts(action) {
  
  try {
    const serverResponse = yield call(POST_API.loadUserLikedPostsAPI, action.userNickname, action.lastId);
    yield put({
      type: POST_ACTION['LOAD_USER_LIKED_POSTS_SUCCESS'],
      responseData: {
        posts: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['LOAD_USER_LIKED_POSTS_FAILURE'],
    });
  }

};

function* watchLoadUserLikedPosts() {

  yield takeLatest(POST_ACTION['LOAD_USER_LIKED_POSTS_REQUEST'], loadUserLikedPosts);

};

function* loadSearchPosts(action) {
  
  try {
    const serverResponse = yield call(POST_API.loadSearchPostsAPI, action.keyword, action.lastId);
    yield put({
      type: POST_ACTION['LOAD_SEARCH_POSTS_SUCCESS'],
      responseData: {
        posts: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['LOAD_SEARCH_POSTS_FAILURE'],
    });
  }

};

function* watchLoadSearchPosts() {

  yield takeLatest(POST_ACTION['LOAD_SEARCH_POSTS_REQUEST'], loadSearchPosts);

};

function* loadPost(action) {

  try {
    const serverResponse = yield call(POST_API.loadPostAPI, action.postId);
    yield put({
      type: POST_ACTION['LOAD_POST_SUCCESS'],
      responseData: {
        post: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['LOAD_POST_FAILURE'],
    });
  }

};

function* watchLoadPost() {

  yield takeLatest(POST_ACTION['LOAD_POST_REQUEST'], loadPost);

};

function* uploadImages(action) {

  try {
    const serverResponse = yield call(POST_API.uploadImagesAPI, action.data.images);
    yield put({
      type: POST_ACTION['UPLOAD_IMAGES_SUCCESS'],
      responseData: {
        imageListType: action.data.imageListType,
        images: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['UPLOAD_IMAGES_FAILURE'],
    });
    alert('잠시 후 다시 시도해 주세요.');
  }

};

function* watchUploadImages() {

  yield takeLatest(POST_ACTION['UPLOAD_IMAGES_REQUEST'], uploadImages);

};

function* addPost(action) {

  try {
    const serverResponse = yield call(POST_API.addPostAPI, action.data);
    yield put({ 
      type: POST_ACTION['ADD_POST_SUCCESS'],
      responseData: {
        post: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['ADD_POST_FAILURE'],
    });
    alert('잠시 후 다시 시도해 주세요.');
  }

};

function* watchAddPost() {

  yield takeLatest(POST_ACTION['ADD_POST_REQUEST'], addPost);

};

function* updatePost(action) {

  try {
    const serverResponse = yield call(POST_API.updatePostAPI, action.postId, action.postData);
    yield put({
      type: POST_ACTION['UPDATE_POST_SUCCESS'],
      responseData: {
        targetPostId: action.postId,
        updatedPost: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['UPDATE_POST_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요.');
    }
  }

};

function* watchUpdatePost() {

  yield takeLatest(POST_ACTION['UPDATE_POST_REQUEST'], updatePost);

};

function* removePost(action) {

  try {
    const serverResponse = yield call(POST_API.removePostAPI, action.postId);
    yield put({
      type: POST_ACTION['REMOVE_POST_SUCCESS'],
      responseData: {
        targetPostId: serverResponse.data.postId,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['REMOVE_POST_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요.');
    }
  }

};

function* watchRemovePost() {

  yield takeLatest(POST_ACTION['REMOVE_POST_REQUEST'], removePost);

};

function* likePost(action) {

  try {
    const serverResponse = yield call(POST_API.likePostAPI, action.postId);
    yield put({
      type: POST_ACTION['LIKE_POST_SUCCESS'],
      responseData: {
        targetPostId: action.postId,
        userId: serverResponse.data.userId,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['LIKE_POST_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요.');
    }
  }

};

function* watchLikePost() {

  yield takeLatest(POST_ACTION['LIKE_POST_REQUEST'], likePost);

};

function* unlikePost(action) {

  try {
    const serverResponse = yield call(POST_API.unlikePostAPI, action.postId);
    yield put({
      type: POST_ACTION['UNLIKE_POST_SUCCESS'],
      responseData: {
        targetPostId: action.postId,
        targetUserId: serverResponse.data.userId,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: POST_ACTION['UNLIKE_POST_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요.');
    }
  }

};

function* watchUnlikePost() {

  yield takeLatest(POST_ACTION['UNLIKE_POST_REQUEST'], unlikePost);

};


export default function* postSaga() {

  yield all([
    fork(watchLoadMainPosts),
    fork(watchAddPost),
    fork(watchLoadUserPosts),
    fork(watchUploadImages),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchUpdatePost),
    fork(watchLoadUserLikedPosts),
    fork(watchLoadSearchPosts),
  ]);

};