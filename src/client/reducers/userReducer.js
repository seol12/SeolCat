import produce from 'immer';
import * as USER_ACTION from '../actions/userActions';


export const initialState = { 
  myInformation: null, 
  userInformation: null,
  signupChecked : null,
};


export default (state = initialState, action) => {
  
  return produce(state, (draft) => {
    switch (action.type) {
      case USER_ACTION['SIGN_UP_REQUEST']: {
        draft.signupChecked = null;
        break;
      }
      case USER_ACTION['SIGN_UP_SUCCESS']: {
        draft.signupChecked = true;
        break;
      }
      case USER_ACTION['SIGN_UP_FAILURE']: {
        draft.signupChecked = null;
        break;
      }
      case USER_ACTION['SIGN_UP_CHECKED']: {
        draft.signupChecked = null;
        break;
      }
      case USER_ACTION['LOG_IN_REQUEST']: {
        break;
      }
      case USER_ACTION['LOG_IN_SUCCESS']: {
        draft.myInformation = action.responseData.myInformation;
        break;
      }
      case USER_ACTION['LOG_IN_FAILURE']: {
        draft.myInformation = null;
        break;
      }
      case USER_ACTION['LOG_OUT_REQUEST']: {
        break;
      }
      case USER_ACTION['LOG_OUT_SUCCESS']: {
        draft.myInformation = null;
        break;
      }
      case USER_ACTION['LOG_OUT_FAILURE']: {
        break;
      }
      case USER_ACTION['LOAD_MY_INFORMATION_REQUEST']: {
        break;
      }
      case USER_ACTION['LOAD_MY_INFORMATION_SUCCESS']: {
        draft.myInformation = action.responseData.myInformation;
        break;
      }
      case USER_ACTION['LOAD_MY_INFORMATION_FAILURE']: {
        break;
      }
      case USER_ACTION['LOAD_USER_INFORMATION_REQUEST']: {
        break;
      }
      case USER_ACTION['LOAD_USER_INFORMATION_SUCCESS']: {
        draft.userInformation = action.responseData.userInformation;
        break;
      }
      case USER_ACTION['LOAD_USER_INFORMATION_FAILURE']: {
        break;
      }
      case USER_ACTION['CHANGE_PROFILE_PICTURE_REQUEST']: {
        break;
      }
      case USER_ACTION['CHANGE_PROFILE_PICTURE_SUCCESS']: {
        draft.userInformation.profilePicture = action.responseData.updatedProfilePicture;
        draft.myInformation.profilePicture = action.responseData.updatedProfilePicture;
        break;
      }
      case USER_ACTION['CHANGE_PROFILE_PICTURE_FAILURE']: {
        break;
      }
      case USER_ACTION['CHANGE_BACKGROUND_REQUEST']: {
        break;
      }
      case USER_ACTION['CHANGE_BACKGROUND_SUCCESS']: {
        draft.userInformation.profileBackground = action.responseData.updatedProfileBackground;
        break;
      }
      case USER_ACTION['CHANGE_BACKGROUND_FAILURE']: {
        break;
      }
      case USER_ACTION['CHANGE_SUBNICKNAME_REQUEST']: {
        break;
      }
      case USER_ACTION['CHANGE_SUBNICKNAME_SUCCESS']: {
        draft.userInformation.subNickname = action.responseData.updatedSubNickname;
        break;
      }
      case USER_ACTION['CHANGE_SUBNICKNAME_FAILURE']: {
        break;
      }
      case USER_ACTION['CHANGE_BIO_REQUSET']: {
        break;
      }
      case USER_ACTION['CHANGE_BIO_SUCCESS']: {
        draft.userInformation.bio = action.responseData.updatedBio;
        break;
      }
      case USER_ACTION['CHANGE_BIO_FAILURE']: {
        break;
      }
      default: {
        break;
      }
    }
  });

};