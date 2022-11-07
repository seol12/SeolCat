import React, { useState, useEffect } from 'react';
import wrapper from '../../store/configStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { LOAD_MY_INFORMATION_REQUEST, LOAD_USER_INFORMATION_REQUEST } from '../../actions/userActions';
import { SELECT_POSTS, LOAD_USER_LIKED_POSTS_REQUEST, LOAD_USER_POSTS_REQUEST } from '../../actions/postActions';
import SEO from '../../components/SEO';
import Layout from '../../components/Layout'
import Profile from '../../containers/Profile';
import ProfilePosts from  '../../containers/ProfilePosts';
import PageResultNotFound from '../../components/PageResultNotFound';


const UserProfile = () => {

  const router = useRouter();
  const { nickname } = router.query;
  const { userInformation } = useSelector(state => state.user);
  const [isSelectedUserPosts, setIsSelectedUserPosts] = useState(true);
  const pageInformation = { 
    title: userInformation ? `${userInformation.nickname} 님의 프로필 - 설캣` : '설캣', 
    description: userInformation ? `${userInformation?.nickname} 님의 작성하신 게시글들 또는 마음에 들어하는 게시글들을 구경해보세요!`  : '최고 또는 최악의 플레이를 설캣에서 박제해 보세요!',
    ogTitle: userInformation ? `${userInformation?.nickname} 님의 프로필 - 설캣`  : '설캣',
    ogDescription: userInformation ? `${userInformation?.nickname} 님의 작성하신 게시글들 또는 마음에 들어하는 게시글들을 구경해보세요!`  : '최고 또는 최악의 플레이를 설캣에서 박제해 보세요!',
    ogUrl: `http://www.seolcat.com/userprofile/${nickname}`,
    ogImage: userInformation?.profileBackground  ? userInformation.profileBackground : null,
  };

  
  useEffect(() => {

    if(router.query.likedPosts) {
      setIsSelectedUserPosts(false);
    }else {
      setIsSelectedUserPosts(true);
    }

  }, [router.query]);

  
  return (
    <>
      <SEO {...pageInformation} />
      <Layout>
        {userInformation 
          ? <>
              <Profile isSelectedUserPosts={isSelectedUserPosts} selectPosts={setIsSelectedUserPosts} />
              <ProfilePosts key='profilePosts' isSelectedUserPosts={isSelectedUserPosts} pathVariable={nickname} />
            </>

          : <PageResultNotFound guide={'앗! 찾으시는 사용자가 없습니다.'} />
        }
      </Layout>
    </>
  );

}


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req, params, query }) => {

  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFORMATION_REQUEST,
  });
  store.dispatch({
    type: LOAD_USER_INFORMATION_REQUEST,
    userNickname: params.nickname,
  });
  store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    userNickname: params.nickname,
  });
  store.dispatch({
    type: LOAD_USER_LIKED_POSTS_REQUEST,
    userNickname: params.nickname,
  });
  if(query.likedPosts) {
    store.dispatch({
      type: SELECT_POSTS,
      postsName: 'userLikedPosts',
    });
  }else {
    store.dispatch({
      type: SELECT_POSTS,
      postsName: 'userPosts',
    });
  }
  store.dispatch(END);
  await store.sagaTask.toPromise();

});


export default UserProfile;