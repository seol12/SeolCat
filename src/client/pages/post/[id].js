import React from 'react';
import wrapper from '../../store/configStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { LOAD_MY_INFORMATION_REQUEST } from '../../actions/userActions';
import { LOAD_POST_REQUEST, SELECT_POSTS } from '../../actions/postActions';
import SEO from '../../components/SEO';
import Layout from '../../components/Layout'
import PostFrame from '../../containers/PostFrame'
import PageResultNotFound from '../../components/PageResultNotFound';


const Post = () => {

  const router = useRouter();
  const { id } = router.query;
  const { userSinglePost } = useSelector(state => state.post);
  const pageInformation = {
    title: userSinglePost?.[0] ? `${userSinglePost[0].User.nickname} 님의 게시글 - 설캣` : '설캣',
    description: '지금 무슨 생각을 하고 계신가요? 오늘의 하루를 설캣에서 공유해 보세요!',
    ogTitle: userSinglePost?.[0] ? `${userSinglePost?.[0].User.nickname} 님의 게시글 - 설캣` : '설캣',
    ogDescription: '지금 무슨 생각을 하고 계신가요? 오늘의 하루를 설캣에서 공유해 보세요!',
    ogUrl: `http://www.seolcat.com/post/${id}`,
    ogImage: userSinglePost?.[0] && userSinglePost[0].Images.length > 0 ? userSinglePost[0].Images[0].src : null,
  };


  return (
    <>
      <SEO {...pageInformation} />
      <Layout>
        {userSinglePost && userSinglePost.length > 0
          ? <>
              {userSinglePost.map((v) => {
                return (
                  <PostFrame key={`userSinglePost/postId/${v.id}`} post={v} />
                )})
              }
            </>

          : <PageResultNotFound guide={'앗! 찾으시는 게시글이 없습니다.'} />
        }
      </Layout>
    </>
  );

};


export const getServerSideProps = wrapper.getServerSideProps((store) => async({ req, params }) => {

  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFORMATION_REQUEST,
  });
  store.dispatch({
    type: LOAD_POST_REQUEST,
    postId: params.id,
  });
  store.dispatch({
    type: SELECT_POSTS,
    postsName: 'userSinglePost',
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();

});


export default Post;