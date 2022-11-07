import axios from 'axios';


export const loadMainPostsAPI = (lastId = 0, limit = 10) => {

  return axios.get(`/posts/mainPosts?lastId=${lastId}&limit=${limit}`, { withCredentials: true });

}

export const loadUserPostsAPI = (userNickname, lastId = 0, limit = 10) => {

  return axios.get(`/posts/userPosts/${encodeURIComponent(userNickname)}?lastId=${lastId}&limit=${limit}`, { withCredentials: true });

}

export const loadUserLikedPostsAPI = (userNickname, lastId = 0, limit = 10) => {

 return axios.get(`/posts/userLikedPosts/${encodeURIComponent(userNickname)}?lastId=${lastId}&limit=${limit}`, { withCredentials: true });

}

export const loadSearchPostsAPI = (keyword, lastId = 0, limit = 10) => {

  return axios.get(`/posts/searchPosts/${encodeURIComponent(keyword)}?lastId=${lastId}&limit=${limit}`, { withCredentials: true });

}

export const loadPostAPI = (postId) => {

  return axios.get(`/post/${postId}`, { withCredentials: true });

}

export const uploadImagesAPI = (imagesData) => {

  return axios.post('/post/images', imagesData, { withCredentials: true });

}

export const addPostAPI = (postData) => {

  return axios.post('/post', postData, { withCredentials: true });

}

export const updatePostAPI = (postId, updatePostData) => {

  return axios.patch(`/post/${postId}`, updatePostData, { withCredentials: true });

}

export const removePostAPI = (postId) => {

  return axios.delete(`/post/${postId}`, { withCredentials: true });

}

export const likePostAPI = (postId) => {

  return axios.post(`/post/postLike/${postId}`, {}, { withCredentials: true });

}

export const unlikePostAPI = (postId) => {

  return axios.delete(`/post/postLike/${postId}`, { withCredentials: true });

}
