import React, { useEffect } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevStateChanged, useValueChanged } from '../../hooks';
import { CHANGE_BIO_REQUSET, CHANGE_SUBNICKNAME_REQUEST } from '../../actions/userActions';
import { SELECT_POSTS } from '../../actions/postActions';
import ProfileAvatar from '../ProfileAvatar';
import ProfileBackground from '../../containers/ProfileBackground';
import ProfileContents from '../../components/ProfileContents';


const Profile = ({ isSelectedUserPosts, selectPosts }) => {

  const dispatch = useDispatch();
  const myId = useSelector(state => state.user.myInformation?.id);
  const { userInformation } = useSelector(state => state.user);
  const [totalUpdate, totalUpdateOnOff] = usePrevStateChanged(false);
  const [subNicknameUpdate, subNicknameUpdateOnOff, initializeSubNicknameUpdate] = usePrevStateChanged(false);
  const [subNicknameValue, onChangeSubNicknameValue, initializeSubNicknameValue] = useValueChanged('');
  const [bioUpdate, bioUpdateOnOff, initializeBioUpdate] = usePrevStateChanged(false);
  const [bioValue, onChanBioValue, initializeBioValue] = useValueChanged('');
 

  useEffect(() => {

    initializeSubNicknameUpdate();
    initializeBioUpdate();

  }, [totalUpdate]);

  const cancelUpdate = (cancelAction, initializeAction) => () => {

    cancelAction();
    initializeAction('');

  };

  const selectUserPosts = (value) => () => {

    if(value) {
      dispatch({
        type: SELECT_POSTS,
        postsName: 'userPosts', 
      });
    }else {
      dispatch({
        type: SELECT_POSTS,
        postsName: 'userLikedPosts'
      });
    }
    selectPosts(value);

  };

  const changeSubNickname = () => {

    let subNicknameData = subNicknameValue;
    if(!subNicknameData || !subNicknameData.trim()) {
      subNicknameData = null;
    }
    dispatch({
      type: CHANGE_SUBNICKNAME_REQUEST,
      subNickname: subNicknameData,
    });
    initializeSubNicknameValue('');
    subNicknameUpdateOnOff();

  };

  const changeBio = () => {

    let bioData = bioValue;
    if(!bioData || !bioData.trim()) {
      bioData = null;
    }
    dispatch({
      type: CHANGE_BIO_REQUSET,
      bio: bioData,
    });
    initializeBioValue('');
    bioUpdateOnOff();

  };


  return (
    <>
      {userInformation &&
        <S.ProfileMainContainer>
          <ProfileBackground isTotalUpdating={totalUpdate} />
          <S.MiddleLine>  
            <div className='avatarWrapper'>
              <ProfileAvatar isTotalUpdating={totalUpdate} />
            </div>
            <div className='totalUpdateContainer'>
              {userInformation.id === myId &&
                <div className='totalUpdateButtonWrapper'>
                  {totalUpdate 
                    ? <button aria-label='profileUpdateCancelButton' onClick={totalUpdateOnOff}>
                        <p>돌아가기</p>
                      </button>

                    : <button aria-label='profileUpdateButton' onClick={totalUpdateOnOff}>
                        <p>프로필 관리</p>
                      </button>
                    }
                </div>
              }
            </div>
          </S.MiddleLine>
          <S.Contents>
            <S.InformationWrapper>
              <S.Information>
                <div className='nickname'>
                  <p>{userInformation.nickname}</p>
                </div>
                <div className='subNickname'>
                  {subNicknameUpdate
                    ? <S.InformationActions contentType={'subNickname'}>
                        <textarea placeholder={`${userInformation.subNickname ? `${userInformation.subNickname}` : ' '}`} maxLength={16} value={subNicknameValue} onChange={onChangeSubNicknameValue} />
                        <button className='changeButton' aria-label='subNicknameChangeSaveButton' onClick={changeSubNickname}>
                          <p>저장</p>
                        </button>
                        <button className='cancelButton' aria-label='subNicknameChangeCancelButton' onClick={cancelUpdate(subNicknameUpdateOnOff, initializeSubNicknameValue)}>
                          <p>취소</p>
                        </button>
                      </S.InformationActions>

                    : <ProfileContents contentType={'subNickname'} />
                  }
                  {totalUpdate && userInformation.id === myId && 
                    <S.UpdateButton aria-label='subNicknameUpdateButton' isUpdating={subNicknameUpdate} onClick={subNicknameUpdateOnOff}>
                      <p>수정</p>
                    </S.UpdateButton>
                  }
                </div>
                <div className='bio'>
                  {bioUpdate
                    ? <S.InformationActions contentType={'bio'}>
                        <textarea placeholder={`${userInformation.bio ? `${userInformation.bio}` : ' '}`} maxLength={30} value={bioValue} onChange={onChanBioValue} />
                        <button className='changeButton' aria-label='bioChangeSaveButton' onClick={changeBio}>
                          <p>저장</p>
                        </button>
                        <button className='cancelButton' aria-label='bioChangeCancelButton' onClick={cancelUpdate(bioUpdateOnOff, initializeBioValue)}>
                          <p>취소</p>
                        </button>
                      </S.InformationActions>

                    : <ProfileContents contentType={'bio'} />
                  }
                  {totalUpdate && userInformation.id === myId &&
                    <S.UpdateButton aria-label='bioUpdateButton' isUpdating={bioUpdate} onClick={bioUpdateOnOff}>
                      <p>수정</p>
                    </S.UpdateButton>
                  }
                </div>
              </S.Information>
            </S.InformationWrapper>
          </S.Contents>
          <S.ChangePostsActions>
            <button className={isSelectedUserPosts ? 'togglePosts' : 'posts'} aria-label='viewUserPostsButton' onClick={selectUserPosts(true)}>
              <p>게시글</p>
            </button>
            <button className={isSelectedUserPosts ? 'likedPosts' : 'toggleLikedPosts'} aria-label='viewUserLikedPostsButton' onClick={selectUserPosts(false)}>
              <p>마음에 들어요</p>
            </button>      
          </S.ChangePostsActions>
        </S.ProfileMainContainer>
      }
    </>
  );

};


export default Profile;