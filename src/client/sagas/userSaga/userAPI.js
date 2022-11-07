import axios from 'axios';


export const signUpAPI = (signUpData) => {

  return axios.post('/user/signup', signUpData, { withCredentials: true });

}

export const logInAPI = (loginData) => {

  return axios.post('/user/login', loginData, { withCredentials: true });

}

export const logOutAPI = () => {

  return axios.post('/user/logout', {}, { withCredentials: true });

}

export const loadMyInformationAPI  = () => {

  return axios.get('/user/myInformation', { withCredentials: true }); 

} 

export const loadUserInformationAPI = (userNickname) => {

  return axios.get(`/user/userInformation/${encodeURIComponent(userNickname)}`, { withCredentials: true });

}

export const uploadImageAPI = (imageData) => {

  return axios.post(`/user/image`, imageData, { withCredentials: true });

}

export const changeProfilePictureAPI = (profilePictureData) => {

  return axios.patch(`/user/profilePicture`, profilePictureData, { withCredentials: true });

}

export const changeBackgroundAPI = (backgroundData) => {

  return axios.patch(`/user/profileBackground`, backgroundData, { withCredentials: true });
  
}

export const changeSubNicknameAPI = (subNicknameData) => {

  return axios.patch(`/user/subNickname`, { subNickname: subNicknameData }, { withCredentials: true });
  
}

export const changeBioAPI = (bioData) => {
  
  return axios.patch(`/user/bio`, { bio: bioData }, { withCredentials: true });

}

