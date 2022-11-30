import React, { useRef, useState } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_PROFILE_PICTURE_REQUEST } from '../../actions/userActions';


const ProfileAvatar = ({ isTotalUpdating }) => {
  
  const dispatch = useDispatch();
  const { userInformation } = useSelector(state => state.user);
  const myId = useSelector(state => state.user.myInformation?.id);
  const uploadRef = useRef();
  const [inputRerender, setInputRerender] = useState(false);


  const inputClick = () => {

    uploadRef.current.click();

  };

  const chnageProfilePicture = (e) => {

    if(e.target.files) {
      const mimeType = e.target.files[0].type.split('/')[0];
      if(mimeType !== 'image') {
        setInputRerender(prev => !prev);
        return alert('이미지만 첨부 가능해요!');
      }
      const newProfilePicture = new FormData();
      newProfilePicture.append('image', e.target.files[0]);
      dispatch({
        type: CHANGE_PROFILE_PICTURE_REQUEST,
        userId: myId,
        profilePicture: newProfilePicture,
      });
      setInputRerender(prev => !prev);
    }

  };

  const initalizeProfilePicture = () => {

    dispatch({
      type: CHANGE_PROFILE_PICTURE_REQUEST,
      userId: myId,
    });

  };


  return (
    <>
      {userInformation && userInformation.profilePicture 
        ? <S.ProfileAvatarMainContainer>
            <S.AvatarWrapper>
              <img src= {userInformation.profilePicture} alt={userInformation.profilePicture} />
            </S.AvatarWrapper>
            {isTotalUpdating && userInformation.id === myId &&
              <S.Actions>
                <input type='file' accept='image/*' hidden key={inputRerender} ref={uploadRef} onChange={chnageProfilePicture} />
                <div className='change'>
                  <button type='button' aria-label='profilePictureChangeButton' onClick={inputClick}>
                    <img src='/profile_info_change_button.svg' alt='profile_info_change_button.svg' />
                  </button>
                </div>
                <div className='initalize'>
                  <button type='button' aria-label='profilePictureInitalizeButton' onClick={initalizeProfilePicture}>
                    <img src='/profile_info_initalize_button.svg' alt='profile_info_initalize_button.svg' />
                  </button>
                </div>
              </S.Actions>
            } 
          </S.ProfileAvatarMainContainer>

        : <S.ProfileAvatarMainContainer>
            <S.DefaultAvatarWrapper>
              <img src='/avatar_default_profile_picture.svg' alt='avatar_default_profile_picture' />
            </S.DefaultAvatarWrapper>
            {isTotalUpdating && userInformation.id === myId &&
              <S.Actions>
                <input type='file' accept='image/*' hidden key={inputRerender} ref={uploadRef} onChange={chnageProfilePicture} />
                <div className='change'>
                  <button type='button' aria-label='profilePictureUploadButton' onClick={inputClick}>
                    <img src='/profile_info_change_button.svg' alt='profile_info_change_button.svg' />
                  </button>
                </div>
              </S.Actions>
            }
         </S.ProfileAvatarMainContainer>
      }
    </>
  );
  
};


export default ProfileAvatar;