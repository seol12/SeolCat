import React, { useState, useEffect } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_SEARCH_POSTS_REQUEST } from '../../actions/postActions';
import PostFrame from '../PostFrame';
import Observer from '../../components/Observer';


const SearchPosts = ({ keyword }) => {

  const dispatch = useDispatch();
  const { searchPosts, muchSearchPosts, pendingSearchPosts } = useSelector(state => state.post);
  const [target, setTarget] = useState(null);


  const loadMorePosts = async([entry], io) => {

    if(entry.isIntersecting) {
      io.unobserve(entry.target);
      if(muchSearchPosts && !pendingSearchPosts) {
        const lastId = searchPosts[searchPosts.length -1]?.id;
        if(!lastId) {
          return;
        }
        dispatch({
          type: LOAD_SEARCH_POSTS_REQUEST,
          keyword: keyword,
          lastId: lastId,
        });
      }
      io.observe(entry.target);
    }

  };

  useEffect(() => {
   
    let io;
    if(target) {
      io = new IntersectionObserver(loadMorePosts, { threshold: 0 });
      io.observe(target);
    }
    return () => {
      return io && io.disconnect();
    }
    
  }, [target, muchSearchPosts, pendingSearchPosts, searchPosts, keyword]);

  
  return (
    <>
      {searchPosts.length > 0
        ? <>
            {searchPosts.map((v) => {
              return (
                <PostFrame key={`searchPosts/postId/${v.id}`} post={v} />
              )})
            }
            <Observer ref={setTarget} />
          </>

        : <S.NoResultsFoundMainContainer>
            <div className='guide'>
              <p>앗! 원하시는 검색결과가 없습니다.</p>
            </div>
          </S.NoResultsFoundMainContainer>
      }
    </>
  );

};


export default SearchPosts;