import React,{ useState, useEffect } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_USER_POSTS_REQUEST, LOAD_USER_LIKED_POSTS_REQUEST } from '../../actions/postActions';
import PostFrame from '../PostFrame';
import Observer from '../../components/Observer';


const ProfilePosts = ({ isSelectedUserPosts, pathVariable }) => {

  const dispatch = useDispatch();
  const { userPosts, userLikedPosts, userMuchPost, userPendingPost, userLikedMuchPost, userLikedPendingPost } = useSelector(state => state.post);
  const { userInformation } = useSelector(state => state.user);
  const [target, setTarget] = useState(null);


  const loadMorePosts = async([entry], io) => {

    if(entry.isIntersecting) {
      io.unobserve(entry.target);
      if(isSelectedUserPosts) {
        if(userMuchPost && !userPendingPost ) {
          const lastId = userPosts[userPosts.length -1]?.id;
          if(!lastId || pathVariable !== userInformation.nickname) {
            return;
          }
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            userNickname: pathVariable,
            lastId: lastId,
          });
        }
      }else {
        if(userLikedMuchPost && !userLikedPendingPost) {
          const lastId = userLikedPosts[userLikedPosts.length -1]?.id;
          if(!lastId || pathVariable !== userInformation.nickname) {
            return;
          }
          dispatch({
            type: LOAD_USER_LIKED_POSTS_REQUEST,
            userNickname: pathVariable,
            lastId: lastId,
          });
        }
      }
      io.observe(entry.target);
    }

  };

  useEffect(() => {

    let csrPageMoveDelay;
    let io;
    if(target) {
      io = new IntersectionObserver(loadMorePosts, { threshold: 0 });
      if(isSelectedUserPosts && userPosts.length === 10 || !isSelectedUserPosts  && userLikedPosts.length === 10) {
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
    
  }, [target, userMuchPost, userPendingPost, userPosts, userLikedPosts, userLikedMuchPost, userLikedPendingPost, isSelectedUserPosts, pathVariable]);


  if(isSelectedUserPosts) {
    return (
      <>
        {userPosts.length > 0
          ? <>
              {userPosts.map((v) => {
                return (
                  <PostFrame key={`userPosts/postId/${v.id}`} post={v} />
                )})
              }
              <Observer ref={setTarget} />
            </>

          : <S.NoResultsFoundMainContainer>
              <div className='guide'>
                <p>아직 작성한 게시글이 없습니다.</p>
              </div>
            </S.NoResultsFoundMainContainer>
        }
      </>
    );
  }else {
    return (
      <>
        {userLikedPosts.length > 0
          ? <>
              {userLikedPosts.map((v) => {
                return (
                  <PostFrame key={`userLikedPosts/postId/${v.id}`} post={v} />
                )})
              }
              <Observer ref={setTarget} />
            </>

          : <S.NoResultsFoundMainContainer>
              <div className='guide'>
                <p>아직 좋아하는 게시글이 없습니다.</p>
              </div>
            </S.NoResultsFoundMainContainer>
        }
      </>
    );
  }

};


export default ProfilePosts;