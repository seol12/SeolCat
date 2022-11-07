import produce from 'immer';
import * as POST_ACTION from '../actions/postActions';
import * as COMMENT_ACTION from '../actions/commentActions';


export const initialState = {
  mainPosts: [],
  userPosts: [],
  userLikedPosts: [],
  searchPosts: [],
  userSinglePost: [], 
  addPostImageList: [],
  updatePostImageList: [], 
  muchPost: true,
  pendingPost: false, 
  userMuchPost: true,
  userPendingPost: false,
  userLikedMuchPost: true,
  userLikedPendingPost: false,
  muchSearchPosts: true,
  pendingSearchPosts: false,
  selectedPosts: null,
};


export default (state = initialState, action) => {
  
  return produce(state, (draft) => {
    switch (action.type) {
      case POST_ACTION['LOAD_MAIN_POSTS_REQUEST']: {
        draft.pendingPost = true;
        draft.mainPosts = !action.lastId ? [] : draft.mainPosts;
        draft.muchPost = action.lastId ? draft.muchPost : true;
        break;
      }
      case POST_ACTION['LOAD_MAIN_POSTS_SUCCESS']: {
        draft.pendingPost = false;
        action.responseData.posts.forEach((v) => {
          draft.mainPosts.push(v);
        });
        draft.muchPost = action.responseData.posts.length === 10;
        break;
      }
      case POST_ACTION['LOAD_MAIN_POSTS_FAILURE']: {
        break;
      }
      case POST_ACTION['LOAD_USER_POSTS_REQUEST']: {
        draft.userPendingPost = true;
        draft.userPosts = !action.lastId ? [] : draft.userPosts;
        draft.userMuchPost = action.lastId ? draft.userMuchPost : true;
        break;
      }
      case POST_ACTION['LOAD_USER_POSTS_SUCCESS']: { 
        draft.userPendingPost = false;
        action.responseData.posts.forEach((v) => {
          draft.userPosts.push(v);
        });
        draft.userMuchPost = action.responseData.posts.length === 10;
        break;
      }
      case POST_ACTION['LOAD_USER_POSTS_FAILURE']: {
        break;
      }
      case POST_ACTION['LOAD_USER_LIKED_POSTS_REQUEST']: {
        draft.userLikedPendingPost = true;
        draft.userLikedPosts = !action.lastId ? [] : draft.userLikedPosts;
        draft.userLikedMuchPost = action.lastId ? draft.userLikedMuchPost : true;
        break;
      }
      case POST_ACTION['LOAD_USER_LIKED_POSTS_SUCCESS']: {
        draft.userLikedPendingPost = false;
        action.responseData.posts.forEach((v) => {
          draft.userLikedPosts.push(v);
        });
        draft.userLikedMuchPost = action.responseData.posts.length === 10;
        break;
      }
      case POST_ACTION['LOAD_USER_LIKED_POSTS_FAILURE']: {
        break;
      }
      case POST_ACTION['LOAD_SEARCH_POSTS_REQUEST']: {
        draft.pendingSearchPosts = true;
        draft.searchPosts = !action.lastId ? [] : draft.searchPosts;
        draft.muchSearchPosts = action.lastId ? draft.muchSearchPosts : true;
        break;
      }
      case POST_ACTION['LOAD_SEARCH_POSTS_SUCCESS']: {
        draft.pendingSearchPosts = false;
        action.responseData.posts.forEach((v) => {
          draft.searchPosts.push(v);
        });
        draft.muchSearchPosts = action.responseData.posts.length === 10;
        break;
      }
      case POST_ACTION['LOAD_SEARCH_POSTS_FAILURE']: {
        break;
      }
      case POST_ACTION['LOAD_POST_REQUEST']: {
        break;
      }
      case POST_ACTION['LOAD_POST_SUCCESS']: {
        draft.userSinglePost.push(action.responseData.post);
        break;
      }
      case POST_ACTION['LOAD_POST_FAILURE']: {
        break;
      }
      case POST_ACTION['UPLOAD_IMAGES_REQUEST']: {
        break;
      }
      case POST_ACTION['UPLOAD_IMAGES_SUCCESS']: {
        const imageListType = action.responseData.imageListType;
        action.responseData.images.forEach((v) => {
          draft[imageListType].push(v);
        });
        break;
      }
      case POST_ACTION['UPLOAD_IMAGES_FAILURE']: {
        break;
      }
      case POST_ACTION['LOAD_POST_IMAGE']: {
        if(action.postImages.length > 0 ) {
          const postImages = action.postImages.map((v) => {
            return v.src;
          });
          draft.updatePostImageList = postImages;
        }else {
          draft.updatePostImageList = [];
        }
        break;
      }
      case POST_ACTION['REMOVE_IMAGE']: {
        const imageListType = action.data.imageListType;
        const removeImageIndex = draft[imageListType].findIndex((v, i) => {
          return action.data.imageIndex === i;
        });
        draft[imageListType].splice(removeImageIndex, 1);
        break;
      }
      case POST_ACTION['ADD_POST_REQUEST']: {
        break;
      }
      case POST_ACTION['ADD_POST_SUCCESS']: {
        draft.addPostImageList = [];
        draft.mainPosts.unshift(action.responseData.post);
        break;
      }
      case POST_ACTION['ADD_POST_FAILURE']: {
        break;
      }
      case POST_ACTION['UPDATE_POST_REQUEST']: {
        break;
      }
      case POST_ACTION['UPDATE_POST_SUCCESS']: {
        draft.updatePostImageList = [];
        const selectedPosts = draft.selectedPosts;
        const postIndex = draft[selectedPosts].findIndex((v) => {
          return v.id === action.responseData.targetPostId;
        });
        if(selectedPosts !== 'userPosts' && selectedPosts !== 'userLikedPosts') {
          draft[selectedPosts][postIndex] = action.responseData.updatedPost;
        }else {
          let samePostCheckCount = 0;
          const postType = ['userPosts', 'userLikedPosts'];
          for(let i = 0; i < 2; i++) {
            const findPost = draft[postType[i]].find((v) => {
              return v.id === action.responseData.targetPostId;
            });
            if(findPost) {
              samePostCheckCount ++;
            }
          }
          if(samePostCheckCount === 2) {
            for(let i = 0; i < 2; i++) {
              const samePostIndex = draft[postType[i]].findIndex((v) => {
                return v.id === action.responseData.targetPostId;    
              });
              draft[postType[i]][samePostIndex] = action.responseData.updatedPost;
            }
          }else {
            draft[selectedPosts][postIndex] = action.responseData.updatedPost;
          }
        }
        break;
      }
      case POST_ACTION['UPDATE_POST_FAILURE']: {
        break;
      }
      case POST_ACTION['REMOVE_POST_REQUEST']: {
        break;
      }
      case POST_ACTION['REMOVE_POST_SUCCESS']: {
        const selectedPosts = draft.selectedPosts;
        const postIndex = draft[selectedPosts].findIndex((v) => {
          return v.id === action.responseData.targetPostId;
        });
        if(selectedPosts !== 'userPosts' && selectedPosts !== 'userLikedPosts') {
          draft[selectedPosts].splice(postIndex, 1);
        }else {
          let samePostCheckCount = 0;
          const postType = ['userPosts', 'userLikedPosts'];
          for(let i = 0; i < 2; i++) {
            const findPost = draft[postType[i]].find((v) => {
              return v.id === action.responseData.targetPostId;
            });
            if(findPost) {
              samePostCheckCount ++;
            }
          }
          if(samePostCheckCount === 2) {
            for(let i = 0; i < 2; i++) {
              const samePostIndex = draft[postType[i]].findIndex((v) => {
                return v.id === action.responseData.targetPostId;
              });
              draft[postType[i]].splice(samePostIndex, 1);
            }
          }else {
            draft[selectedPosts].splice(postIndex, 1);
          }
        }
        break;
      }
      case POST_ACTION['REMOVE_POST_FAILURE']: {
        break;
      }
      case POST_ACTION['LIKE_POST_REQUEST']: {
        break;
      }
      case POST_ACTION['LIKE_POST_SUCCESS']: {
        const selectedPosts = draft.selectedPosts;
        const postIndex = draft[selectedPosts].findIndex((v) => {
          return v.id === action.responseData.targetPostId;
        });
        if(selectedPosts !== 'userPosts' && selectedPosts !== 'userLikedPosts') {
          draft[selectedPosts][postIndex].PostLikers.unshift({ id: action.responseData.userId });
        }else {
          let samePostCheckCount = 0;
          const postType = ['userPosts', 'userLikedPosts'];
          for(let i = 0; i < 2; i++) {
            const findPost = draft[postType[i]].find((v) => {
              return v.id === action.responseData.targetPostId;
            });
            if(findPost) {
              samePostCheckCount ++;
            }
          }
          if(samePostCheckCount === 2) {
            for(let i = 0; i < 2; i++) {
              const samePostIndex = draft[postType[i]].findIndex((v) => {
                return v.id === action.responseData.targetPostId;
              });
              draft[postType[i]][samePostIndex].PostLikers.unshift({id: action.responseData.userId});
            }
          }else {
            draft[selectedPosts][postIndex].PostLikers.unshift({id: action.responseData.userId});
          }
        }
        break;
      }
      case POST_ACTION['LIKE_POST_FAILURE']: {
        break;
      }
      case POST_ACTION['UNLIKE_POST_REQUEST']: {
        break;
      }
      case POST_ACTION['UNLIKE_POST_SUCCESS']: {
        const selectedPosts = draft.selectedPosts;
        const postIndex = draft[selectedPosts].findIndex((v) => {
          return v.id === action.responseData.targetPostId;
        });
        const likeIndex = draft[selectedPosts][postIndex].PostLikers.findIndex((v) => {
          return v.id === action.responseData.targetUserId;
        });
        if(selectedPosts !== 'userPosts' && selectedPosts !== 'userLikedPosts') {
          draft[selectedPosts][postIndex].PostLikers.splice(likeIndex, 1);
        }else {
          let samePostCheckCount = 0;
          const postType = ['userPosts', 'userLikedPosts'];
          for(let i = 0; i < 2; i++) {
            const findPost = draft[postType[i]].find((v) => {
              return v.id === action.responseData.targetPostId;
            });
            if(findPost) {
              samePostCheckCount ++;
            }
          }
          if(samePostCheckCount === 2) {
            for(let i = 0; i < 2; i++) {
              const samePostIndex = draft[postType[i]].findIndex((v) => {
                return v.id === action.responseData.targetPostId;
              });
              const sameLikeIndex = draft[postType[i]][samePostIndex].PostLikers.findIndex((v) => {
                return v.id === action.responseData.targetUserId;
              });
              draft[postType[i]][samePostIndex].PostLikers.splice(sameLikeIndex, 1);
            }
          }else {
            draft[selectedPosts][postIndex].PostLikers.splice(likeIndex, 1);
          }  
        }
        break;
      }
      case POST_ACTION['UNLIKE_POST_FAILURE']: {
        break;
      }
      case COMMENT_ACTION['ADD_COMMENT_REQUEST']: {
        break;
      }
      case COMMENT_ACTION['ADD_COMMENT_SUCCESS']: {
        const selectedPosts = draft.selectedPosts;
        const postIndex = draft[selectedPosts].findIndex((v) => {
          return v.id === action.responseData.targetPostId;
        });
        if(selectedPosts !== 'userPosts' && selectedPosts !== 'userLikedPosts') {
          draft[selectedPosts][postIndex].Comments.push(action.responseData.newComment);
          return;
        }else {
          let samePostCheckCount = 0;
          const postType = ['userPosts', 'userLikedPosts'];
          for(let i = 0; i < 2; i++) {
            const findPost = draft[postType[i]].find((v) => {
              return v.id === action.responseData.targetPostId;
            });
            if(findPost) {
              samePostCheckCount ++;
            }
          }
          if(samePostCheckCount === 2) {
            for(let i = 0; i < 2; i++) {
              const samePostIndex = draft[postType[i]].findIndex((v) => {
                return v.id === action.responseData.targetPostId;
              });
              draft[postType[i]][samePostIndex].Comments.push(action.responseData.newComment);
            }
          }else {
            draft[selectedPosts][postIndex].Comments.push(action.responseData.newComment);
          }
        } 
        break;
      }
      case COMMENT_ACTION['ADD_COMMENT_FAILURE']: {
        break;
      }
      case COMMENT_ACTION['UPDATE_COMMENT_REQUEST']: {
        break;
      }
      case COMMENT_ACTION['UPDATE_COMMENT_SUCCESS']: {
        const selectedPosts = draft.selectedPosts;
        const postIndex = draft[selectedPosts].findIndex((v) => {
          return v.id === action.responseData.targetPostId;
        });
        const commentIndex = draft[selectedPosts][postIndex].Comments.findIndex((v) => {
          return v.id === action.responseData.targetCommentId;
        });
        if(selectedPosts !== 'userPosts' && selectedPosts !== 'userLikedPosts') {
          draft[selectedPosts][postIndex].Comments[commentIndex].content = action.responseData.updatedContent;
        }else {
          let samePostCheckCount = 0;
          const postType = ['userPosts', 'userLikedPosts'];
          for(let i = 0; i < 2; i++) {
            const findPost = draft[postType[i]].find((v) => {
              return v.id === action.responseData.targetPostId;
            });
            if(findPost) {
              samePostCheckCount ++;
            }
          }
          if(samePostCheckCount === 2) {
            for(let i = 0; i < 2; i++) {
              const samePostIndex = draft[postType[i]].findIndex((v) => {
                return v.id === action.responseData.targetPostId;
              });
              const samePostCommentIndex = draft[postType[i]][samePostIndex].Comments.findIndex((v) => {
                return v.id === action.responseData.targetCommentId;
              });
              draft[postType[i]][samePostIndex].Comments[samePostCommentIndex].content = action.responseData.updatedContent;
            }
          }else {
            draft[selectedPosts][postIndex].Comments[commentIndex].content = action.responseData.updatedContent;
          }
        }     
        break;
      }
      case COMMENT_ACTION['UPDATE_COMMENT_FAILURE']: {
        break;
      }
      case COMMENT_ACTION['REMOVE_COMMENT_REQUEST']: {
        break;
      }
      case COMMENT_ACTION['REMOVE_COMMENT_SUCCESS']: {
        const selectedPosts = draft.selectedPosts;
        const postIndex = draft[selectedPosts].findIndex((v) => {
          return v.id === action.responseData.targetPostId;
        });
        const commentIndex = draft[selectedPosts][postIndex].Comments.findIndex((v) => {
          return v.id === action.responseData.targetCommentId;
        });
        if(selectedPosts !== 'userPosts' && selectedPosts !== 'userLikedPosts') {
          draft[selectedPosts][postIndex].Comments.splice(commentIndex, 1);
        }else {
          let samePostCheckCount = 0;
          const postType = ['userPosts', 'userLikedPosts'];
          for(let i = 0; i < 2; i++) {
            const findPost = draft[postType[i]].find((v) => {
              return v.id === action.responseData.targetPostId;
            });
            if(findPost) {
              samePostCheckCount ++;
            }
          }
          if(samePostCheckCount === 2) {
            for(let i = 0; i < 2; i++) {
              const samePostIndex = draft[postType[i]].findIndex((v) => {
                return v.id === action.responseData.targetPostId;
              });
              const sameCommentIndex = draft[postType[i]][samePostIndex].Comments.findIndex((v) => {
                return v.id === action.responseData.targetCommentId;
              });
              draft[postType[i]][samePostIndex].Comments.splice(sameCommentIndex, 1);
            }
          }else {
            draft[selectedPosts][postIndex].Comments.splice(commentIndex, 1);
          }
        }
        break;
      }
      case COMMENT_ACTION['REMOVE_COMMENT_FAILURE']: {
        break;
      }
      case POST_ACTION['CHANGE_PROFILE_PICTURE_MY_POSTS']: {
        const changeProfileMyPosts = draft['userPosts'].map((v) => {
          return {
            ...v, 
            User: {
              ...v.User,
              profilePicture: action.responseData.updatedProfilePicture,
            },
          };
        });
        const changeProfileMyLikedPosts = draft['userLikedPosts'].map((v) => {
          if(v.UserId === action.responseData.targetUserId) {
            return {
              ...v,
              User: {
                ...v.User,
                profilePicture: action.responseData.updatedProfilePicture,
              },
            }
            }else {
              return v
            }

          });
        draft['userPosts'] = changeProfileMyPosts;
        draft['userLikedPosts'] = changeProfileMyLikedPosts;
        break;
      }
      case POST_ACTION['SELECT_POSTS']: {
        draft.selectedPosts = action.postsName;
        break;
      }
      default: {
        break;
      }
    }
  });
  
};