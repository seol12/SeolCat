import React from 'react';
import * as S from './style';


const UserAvatar = ({ profilePicture, size }) => {

  if(profilePicture) {
    return (
      <>
        <S.ProfilePicture avatarSize={size}>
          <img src= {profilePicture} alt={profilePicture} />
        </S.ProfilePicture>  
      </>
    );
  }else {
    return (
      <>
        <S.DefaultProfilePicture avatarSize={size}>
          <img src='/avatar_default_profile_picture.svg' alt='avatar_default_profile_picture.svg' />
        </S.DefaultProfilePicture>
      </>
    );
  }

};


export default UserAvatar;