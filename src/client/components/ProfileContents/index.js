import React from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';


const ProfileContents = ({ contentType }) => {

  const { userInformation } = useSelector(state => state.user);


  return (
    <>
      {userInformation && contentType === 'subNickname'
        ? <S.SubNickname>
            {userInformation.subNickname
              ? <p>@{userInformation.subNickname}</p>

              : <p>칭호가 없습니다</p>
            }
          </S.SubNickname>
          
        : <S.Bio>
            {userInformation.bio
              ? <p>{userInformation.bio}</p>

              : <p>소개글이 없습니다</p>
            }
          </S.Bio>
        }
    </>
  );

};


export default ProfileContents;