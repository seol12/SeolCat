import React from 'react';
import wrapper from '../../store/configStore';
import axios from 'axios';
import { END } from 'redux-saga';
import { useRouter } from 'next/router';
import { LOAD_MY_INFORMATION_REQUEST } from '../../actions/userActions';
import { LOAD_SEARCH_POSTS_REQUEST, SELECT_POSTS } from '../../actions/postActions';
import SEO from '../../components/SEO';
import Layout from '../../components/Layout'
import SearchResult from '../../components/SearchResult';
import SearchPosts from '../../containers/SearchPosts';


const Search = () => {

  const router = useRouter();
  const { keyword } = router.query;
  const pageInformation = {
    title: `'${keyword}'에 대한 검색 결과 - 설캣`,
    description: '지금 무슨 생각을 하고 계신가요? 오늘의 하루를 설캣에서 공유해 보세요!',
    ogTitle: '설캣',
    ogDescription: '지금 무슨 생각을 하고 계신가요? 오늘의 하루를 설캣에서 공유해 보세요!',
    ogUrl: `http://www.seolcat.com/search/${keyword}`,
    ogImage: null,
  };

  
  return (
    <>
      <SEO {...pageInformation} />
      <Layout>
        <SearchResult keyword={keyword} />
        <SearchPosts keyword={keyword} />
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
    type: LOAD_SEARCH_POSTS_REQUEST,
    keyword: params.keyword,
  });
  store.dispatch({
    type: SELECT_POSTS,
    postsName: 'searchPosts',
  });
  store.dispatch(END);
  await store.sagaTask.toPromise();
  
});


export default Search;