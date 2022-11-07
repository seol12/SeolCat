import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import * as USER_API from './userAPI';
import * as USER_ACTION from '../../actions/userActions';
import { CHANGE_PROFILE_PICTURE_MY_POSTS } from '../../actions/postActions';


function* signUp(action) {

  try {
    yield call(USER_API.signUpAPI, action.data);
    yield put({ 
      type: USER_ACTION['SIGN_UP_SUCCESS'],
    });
  }catch(e) { 
    console.error(e);
    yield put({
      type: USER_ACTION['SIGN_UP_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요!');
    }
  }

};

function* watchSignUp() {

  yield takeLatest(USER_ACTION['SIGN_UP_REQUEST'], signUp);

};


function* login(action) {

  try {
    const serverResponse = yield call(USER_API.logInAPI, action.data);
    yield put({ 
      type: USER_ACTION['LOG_IN_SUCCESS'],
      responseData: {
        myInformation: serverResponse.data,
      },
    });
  }catch(e) { 
    console.error(e);
    yield put({
      type: USER_ACTION['LOG_IN_FAILURE'],
    });
    if(e.response?.data) {
      alert(`${e.response.data}`);
    }else {
      alert('잠시 후 다시 시도해 주세요!');
    }
  }

};

function* watchLogin() {

  yield takeLatest(USER_ACTION['LOG_IN_REQUEST'], login);

};

function* logout() {

  try {
    yield call(USER_API.logOutAPI);
    yield put({ 
      type: USER_ACTION['LOG_OUT_SUCCESS'],
    });
  }catch(e) { 
    console.error(e);
    yield put({
      type: USER_ACTION['LOG_OUT_FAILURE'],
    });
    alert('잠시 후 다시 시도해 주세요!');
  }

};

function* watchLogout() {

  yield takeLatest(USER_ACTION['LOG_OUT_REQUEST'], logout);

};

function* loadMyInformation() {

  try {
    const serverResponse = yield call(USER_API.loadMyInformationAPI);
    yield put({ 
      type: USER_ACTION['LOAD_MY_INFORMATION_SUCCESS'],
      responseData: {
        myInformation: serverResponse.data,
      },
    });
  }catch(e) { 
    console.error(e);
    yield put({
      type: USER_ACTION['LOAD_MY_INFORMATION_FAILURE'],
    });
  }

};

function* watchLoadMyInformation() {

  yield takeLatest(USER_ACTION['LOAD_MY_INFORMATION_REQUEST'], loadMyInformation);

};

function* loadUserInformation(action) {
  
  try {
    const serverResponse = yield call(USER_API.loadUserInformationAPI, action.userNickname);
    yield put({
      type: USER_ACTION['LOAD_USER_INFORMATION_SUCCESS'],
      responseData: {
        userInformation: serverResponse.data,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: USER_ACTION['LOAD_USER_INFORMATION_FAILURE'],
    });
  }
};

function* watchLoadUserInformation() {

  yield takeLatest(USER_ACTION['LOAD_USER_INFORMATION_REQUEST'], loadUserInformation);

};

function* changeProfilePicture(action) {

  try {
    if(!action.profilePicture) {
      const serverResponse = yield call(USER_API.changeProfilePictureAPI, { profilePicture: null });
      yield put({
        type: USER_ACTION['CHANGE_PROFILE_PICTURE_SUCCESS'],
        responseData: {
          updatedProfilePicture: serverResponse.data.profilePicture,
        },
      });
      yield put({
        type: CHANGE_PROFILE_PICTURE_MY_POSTS,
        responseData: {
          targetUserId: action.userId,
          updatedProfilePicture: serverResponse.data.profilePicture,
        },
      });
    }else {
      const upload = yield call(USER_API.uploadImageAPI, action.profilePicture);
      const serverResponse = yield call(USER_API.changeProfilePictureAPI, { profilePicture: upload.data });
      yield put({
        type: USER_ACTION['CHANGE_PROFILE_PICTURE_SUCCESS'],
        responseData: {
          updatedProfilePicture: serverResponse.data.profilePicture,
        },
      });
      yield put({
        type: CHANGE_PROFILE_PICTURE_MY_POSTS,
        responseData: {
          targetUserId: action.userId,
          updatedProfilePicture: serverResponse.data.profilePicture,
        },
      });
    }
  }catch(e) {
    console.error(e);
    yield put({
      type: USER_ACTION['CHANGE_PROFILE_PICTURE_FAILURE'],
    });
    alert('잠시 후 다시 시도해 주세요!')
  }

};

function* watchChangeProfilePicture() {

  yield takeLatest(USER_ACTION['CHANGE_PROFILE_PICTURE_REQUEST'], changeProfilePicture);

};

function* changeBackground(action) {

  try {
    if(!action.profileBackground) {
      const serverResponse = yield call(USER_API.changeBackgroundAPI, { profileBackground: null });
      yield put({
        type: USER_ACTION['CHANGE_BACKGROUND_SUCCESS'],
        responseData: {
          updatedProfileBackground: serverResponse.data.profileBackground,
        },
      });
    }else {
      const upload = yield call(USER_API.uploadImageAPI, action.profileBackground);
      const serverResponse = yield call(USER_API.changeBackgroundAPI, { profileBackground: upload.data });
      yield put({
        type: USER_ACTION['CHANGE_BACKGROUND_SUCCESS'],
        responseData: {
          updatedProfileBackground: serverResponse.data.profileBackground,
        },
      });
    }
  }catch(e) {
    console.error(e);
    yield put({
      type: USER_ACTION['CHANGE_BACKGROUND_FAILURE'],
    });
    alert('잠시 후 다시 시도해 주세요!');
  }

};

function* watchChangeBackground() {

  yield takeLatest(USER_ACTION['CHANGE_BACKGROUND_REQUEST'], changeBackground);

};

function* changeSubNickname(action) {

  try {
    const serverResponse = yield call(USER_API.changeSubNicknameAPI, action.subNickname);
    yield put({
      type: USER_ACTION['CHANGE_SUBNICKNAME_SUCCESS'],
      responseData: {
        updatedSubNickname: serverResponse.data.subNickname,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: USER_ACTION['CHANGE_SUBNICKNAME_FAILURE'],
    });
    alert('잠시 후 다시 시도해 주세요!');
  }

};

function* watchChangeSubNickname() {
 
  yield takeLatest(USER_ACTION['CHANGE_SUBNICKNAME_REQUEST'], changeSubNickname);

};

function* changeBio(action) {
  
  try {
    const serverResponse = yield call(USER_API.changeBioAPI, action.bio);
    yield put({
      type: USER_ACTION['CHANGE_BIO_SUCCESS'],
      responseData: {
        updatedBio: serverResponse.data.bio,
      },
    });
  }catch(e) {
    console.error(e);
    yield put({
      type: USER_ACTION['CHANGE_BIO_FAILURE'],
    });
    alert('잠시 후 다시 시도해 주세요!');
  }

};

function* watchChangeBio() {

 yield takeLatest(USER_ACTION['CHANGE_BIO_REQUSET'], changeBio);

};


export default function* userSaga() {

  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchLoadMyInformation),
    fork(watchLoadUserInformation),
    fork(watchSignUp),
    fork(watchChangeProfilePicture),
    fork(watchChangeSubNickname),
    fork(watchChangeBio),
    fork(watchChangeBackground),
  ]);

};