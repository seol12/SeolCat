import React, { useRef } from 'react';
import * as S from './style';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux'
import { LOG_OUT_REQUEST } from '../../actions/userActions';
import Link from 'next/link';
import UserAvatar from '../../components/UserAvatar';


const Menubar = ({ mode, animation, closeAction }) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const { myInformation } = useSelector(state => state.user);
  const throttleRef = useRef(null);
  const backgroundRef = useRef(null);

 
  const logout = () => {
    
     dispatch({
      type: LOG_OUT_REQUEST,
    });

  };
  
  const movePage = (path, pageType) => () => {

    closeAction();
    if(!myInformation && pageType !== 'home') {
      return alert('로그인 후 사용해 주세요!');
    }
    if(pageType === 'likedPosts') {
      router.push({
        pathname: path, 
        query: { 
          likedPosts: 'Y',
        }
      });
    }else {
      router.push(path);
    }
    
  };

  const handleClickBackground = (e) => {
   
    if(e.target === backgroundRef.current) {
      if(throttleRef.current) {
        return;
      }else {
        closeAction();
        throttleRef.current = setTimeout(() => {
          clearTimeout(throttleRef.current);
          throttleRef.current = null;
        }, 200);
      }
    }else {
      return;
    }

  };


  if(mode === 'PC') {
    return (
      <>
        <S.MenubarMainContainer>
          <S.Header>
            {myInformation
              ? <>
                  <S.MyInformation>
                    <S.AvatarWrapper>
                      <UserAvatar profilePicture={myInformation.profilePicture} size={'big'} />
                    </S.AvatarWrapper>
                    <S.Information>
                      <div className='nickname'>
                        <p>{myInformation.nickname} 님</p>
                      </div>
                      <div className='userId'>
                        <p>{myInformation.userId}</p>
                      </div>
                    </S.Information>
                  </S.MyInformation>
                  <button aria-label='logOutButton' onClick={logout}>
                    <p>로그아웃</p>
                  </button>
                </>

              : <button aria-label='logInButton'>
                  <Link href={{pathname: '/login', query: {'prev-page': `${router.asPath}`}}}>
                    <a>
                      <p>로그인 / 회원가입</p>
                    </a>
                  </Link>
                </button>
            }
          </S.Header>
          <S.Contents>
            <div className='routerItemContainer'>
              <S.RouterItem>
                <img src='/menu_bar_move_home.svg' alt='menu_bar_move_home.svg' />
                <p onClick={movePage(`/`, 'home')}>메인</p>
              </S.RouterItem>
            </div>
            <div className='routerItemContainer'>
              <S.RouterItem>
                <img src='/menu_bar_move_profile.svg' alt='menu_bar_move_profile.svg' />
                <p onClick={movePage(`/userprofile/${myInformation?.nickname}`, 'profile')}>프로필</p>
              </S.RouterItem>
            </div>
            <div className='routerItemContainer'>
              <S.RouterItem>
                <img src='/menu_bar_move_user_like_posts.svg' alt='menu_bar_move_user_like_posts.svg' />
                <p onClick={movePage(`/userprofile/${myInformation?.nickname}`, 'likedPosts')}>좋아요</p>
              </S.RouterItem>
            </div>
          </S.Contents>
        </S.MenubarMainContainer>
      </>
    );
  }else {
    return (
      <>
        <S.Modalbackgronud ref={backgroundRef} onClick={handleClickBackground}>
          <S.MobileMenuBarMainContainer animation={animation}>
            <S.MobileHeaderWrapper>
              <S.MobileHeader>
                <div className='exitButtonWrapper'>
                  <button aria-label='menuBarOffButton' onClick={closeAction}>
                    <img src='/menu_bar_exit_button.svg' alt='menu_bar_exit_button.svg' />
                  </button>
                </div>
                <div className='mainLogoWrapper'>
                  <img src='/menu_bar_main_logo.svg' alt='menu_bar_main_logo.svg' />
                </div>
              </S.MobileHeader>
            </S.MobileHeaderWrapper>
            <S.MobileMyInformationWrapper>
              {myInformation
                ? <>
                    <S.MyInformation>
                      <S.AvatarWrapper>
                        <UserAvatar profilePicture={myInformation.profilePicture} size={'big'} />
                      </S.AvatarWrapper>
                      <S.Information>
                        <div className='nickname'>
                          <p>{myInformation.nickname} 님</p>
                        </div>
                        <div className='userId'>
                          <p>{myInformation.userId}</p>
                        </div>
                      </S.Information>
                    </S.MyInformation>
                    <button aria-label='logOutButton' onClick={logout}>
                      <p>로그아웃</p>
                    </button>
                  </>

                : <>
                    <div className='middleLogoWrapper'>
                      <img src='/menu_bar_middle_logo.svg' alt='menu_bar_middle_logo.svg' />
                    </div>
                    <button aria-label='logInButton'>
                      <Link href={{pathname: '/login', query: {'prev-page': `${router.asPath}`}}}>
                        <a>
                          <p>로그인 / 회원가입</p>
                        </a>
                      </Link>
                    </button>
                  </>
              }
            </S.MobileMyInformationWrapper>
            <S.Contents>
              <div className='routerItemContainer'>
                <S.RouterItem>
                  <img src='/menu_bar_move_home.svg' alt='menu_bar_move_home' />
                    <p onClick={movePage(`/`, 'home')}>메인</p>
                </S.RouterItem>
              </div>
              <div className='routerItemContainer'>
                <S.RouterItem>
                  <img src='/menu_bar_move_profile.svg' alt='menu_bar_move_profile.svg' />
                  <p onClick={movePage(`/userprofile/${myInformation && myInformation.nickname}`, 'profile')}>프로필</p>
                </S.RouterItem>
              </div>
              <div className='routerItemContainer'>
              <S.RouterItem>
                <img src='/menu_bar_move_user_like_posts.svg' alt='menu_bar_move_user_like_posts.svg' />
                <p onClick={movePage(`/userprofile/${myInformation && myInformation.nickname}`, 'likedPosts')}>좋아요</p>
              </S.RouterItem>
            </div>
            </S.Contents>
          </S.MobileMenuBarMainContainer>
        </S.Modalbackgronud>
      </>
    );
  }
  
};


export default Menubar;