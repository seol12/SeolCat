import React, { useRef, useState, useEffect } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_BACKGROUND_REQUEST } from '../../actions/userActions';
import Image from 'next/image';
import LoadingSpinner from '../../components/LoadingSpinner';


const ProfileBackground = ({ isTotalUpdating }) => {

  const dispatch = useDispatch();
  const myId = useSelector(state => state.user.myInformation?.id);
  const { userInformation } = useSelector(state => state.user);
  const uploadRef = useRef(null);
  const [isImageLoading, setImageLoading] = useState(true);
  const [inputRerender, setInputRerender] = useState(false);
  

  useEffect(() => {
    
    setImageLoading(true);

  }, [userInformation.profileBackground]);

  const inputClick = () => {

    uploadRef.current.click();

  };

  const chnageProfileBackground = (e) => {

    if(e.target.files) {
      const mimeType = e.target.files[0].type.split('/')[0];
      if(mimeType !== 'image') {
        setInputRerender(prev => !prev);
        return alert('이미지만 첨부 가능해요!');
      }
      const newProfileBackground = new FormData();
      newProfileBackground.append('image', e.target.files[0]);
      dispatch({
        type: CHANGE_BACKGROUND_REQUEST,
        profileBackground: newProfileBackground,
      });
      setInputRerender(prev => !prev);
    }

  };

  const initializeProfileBackground = () => {

    dispatch({
      type: CHANGE_BACKGROUND_REQUEST,
    });

  };


  return (
    <>
      {userInformation && userInformation.profileBackground
        ? <S.ProfileBackgroundMainContainer>
            <S.BackgroundWrapper isUpdating={isTotalUpdating}>
              <S.Background>
                {isImageLoading &&
                  <LoadingSpinner size={'big'} />
                }
                <Image layout='fill' src={userInformation.profileBackground} alt={userInformation.profileBackground} 
                  onLoadingComplete={() => {setImageLoading(false)}}
                />
              </S.Background>
            </S.BackgroundWrapper>
            {isTotalUpdating && userInformation.id === myId &&
              <S.Actions>
                <input type="file" accept="image/*" hidden key={inputRerender} ref={uploadRef} onChange={chnageProfileBackground} />
                  <div className='change'>
                    <button type='button' aria-label='profileBackgroundChangeButton' onClick={inputClick}>
                      <img src='/profile_info_change_button.svg' alt='profile_info_change_button.svg' />
                    </button>
                  </div>
                <div className='initialize'>
                  <button type='button' aria-label='profileBackgroundInitializeButton' onClick={initializeProfileBackground}>
                    <img src='/profile_info_initialize_background_button.svg' alt='profile_info_initialize_background_button.svg' />
                  </button>
                </div>
              </S.Actions>
            }   
          </S.ProfileBackgroundMainContainer>

        : <S.ProfileBackgroundMainContainer>
            <S.DefaultBackground />
            {isTotalUpdating && userInformation.id === myId &&
              <S.Actions>
                <input type="file" accept="image/*" hidden key={inputRerender} ref={uploadRef} onChange={chnageProfileBackground} />
                  <div className='change'>
                    <button type='button' aria-label='profileBackgroundUploadButton' onClick={inputClick}>
                      <img src='/profile_info_change_button.svg' alt='profile_info_change_button.svg' />
                    </button>
                  </div>
              </S.Actions>
            }
          </S.ProfileBackgroundMainContainer>
      } 
    </>
  );

};


export default ProfileBackground;