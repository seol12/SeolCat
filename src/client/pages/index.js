import React, { useState, useEffect } from 'react';
import wrapper from '../store/configStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_MY_INFORMATION_REQUEST } from '../actions/userActions';
import { SELECT_POSTS, LOAD_MAIN_POSTS_REQUEST } from '../actions/postActions';
import SEO from '../components/SEO';
import Layout from '../components/Layout'
import PostForm from '../containers/PostForm';
import PostFrame from '../containers/PostFrame'
import Observer from '../components/Observer';


const Home = () => {
  
  const dispatch = useDispatch();
  const { mainPosts, pendingPost, muchPost } = useSelector(state => state.post);
  const { myInformation } = useSelector(state => state.user);
  const [target, setTarget] = useState(null);
  const pageInformation = { 
    title: '설캣', 
    description: '최고 또는 최악의 플레이를 설캣에서 박제해 보세요!',
    ogTitle: '설캣',
    ogDescription: '최고 또는 최악의 플레이를 설캣에서 박제해 보세요!',
    ogUrl: 'http://www.seolcat.com',
    ogImage: null,
  };

  
  const loadMorePosts = async([entry], io) => {

    if(entry.isIntersecting) {
      io.unobserve(entry.target);
      if(muchPost && !pendingPost) {
        const lastId = mainPosts[mainPosts.length -1]?.id;
        if(!lastId) {
          return;
        }
        dispatch({
          type: LOAD_MAIN_POSTS_REQUEST,
          lastId
        });
      }
      io.observe(entry.target);
    }

  };

  useEffect(() => {

    let csrPageMoveDelay;
    let io;
    if(target) {
      io = new IntersectionObserver(loadMorePosts, { threshold: 0 });
      if(mainPosts.length === 10) {
        csrPageMoveDelay = setTimeout(() => {
          io.observe(target);
        }, 250);
      }else {
        io.observe(target);
      }
    }
    return () => {
      clearTimeout(csrPageMoveDelay);
      io && io.disconnect();
    }
    
  }, [target, muchPost, pendingPost, mainPosts]);

      
  return (
    <>
      <SEO {...pageInformation} />
      <Layout>
        {myInformation && 
          <PostForm />
        }
        {mainPosts.map((v) => {
          return (
            <PostFrame key={v.id} post={v} />
          )})
        }
        <Observer ref={setTarget} />
      </Layout>
    </>
  );
    
};


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ req }) => {

  const cookie = req ? req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if(req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  store.dispatch({
    type: LOAD_MY_INFORMATION_REQUEST,
  });
  store.dispatch({
    type: LOAD_MAIN_POSTS_REQUEST,
  });
  store.dispatch({
    type: SELECT_POSTS,
    postsName: 'mainPosts',
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
  
});


export default Home;