import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import userReducer from './userReducer';
import postReducer from './postReducer';


const rootReducer = (state, action) => {

  switch(action.type) {
    case HYDRATE: {
      return {
        ...state,
        ...action.payload
      };
    }
    default: {
      return combineReducers({user: userReducer, post: postReducer})(state, action);
    }
  }

};

export default rootReducer;