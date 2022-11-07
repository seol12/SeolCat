import axios from 'axios';


export const addCommentAPI = (postId, commentContent) => {

  return axios.post(`/comment/${postId}`, { content: commentContent }, { withCredentials: true });

}

export const updateCommentAPI = (commentId, updateCommentData) => {

  return axios.patch(`/comment/${commentId}`, updateCommentData, { withCredentials: true });

}

export const removeCommentAPI = (commentId, postId) => {

  return axios.delete(`/comment/${commentId}?postId=${postId}`, { withCredentials: true });
  
}
