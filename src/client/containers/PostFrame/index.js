import React, { memo, useRef, useState } from 'react';
import * as S from './style';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevStateChanged, useHandleClickOutside } from '../../hooks';
import { REMOVE_POST_REQUEST, LIKE_POST_REQUEST, UNLIKE_POST_REQUEST } from '../../actions/postActions';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import UtilMenu from '../../components/UtilMenu';
import RemoveActionModal from '../RemoveActionModal';
import UpdateActionModal from '../UpdateActionModal';
import PostImages from '../../components/PostImages';
import UserAvatar from '../../components/UserAvatar';
import CommentList from '../../components/CommentList';


dayjs.locale('ko');


const PostFrame = memo(({ post }) => {
  
  const router = useRouter();
  const dispatch = useDispatch();
  const myId = useSelector(state => state.user.myInformation?.id);
  const utilMenuRef = useRef(null);
  const commentListWrapperRef = useRef(null);
  const throttleRef = useRef(null);
  const [removeModal, removeModalOnOff] = usePrevStateChanged(false);
  const [updatemodal, updateModalOnOff] = usePrevStateChanged(false);
  const [utilMenu, utilMenuOnOff, utilMenuAnimation, utilMenuOff] = useHandleClickOutside(false, utilMenuRef, false);
  const [commentForm, commentFormOnOff] = usePrevStateChanged(false);
  const [commentFormAnimation, commentFormAnimationOnOff] = usePrevStateChanged(false);
  const [commentLineMaxheight, setCommentLineMaxheight] = useState(null);
  const targetPostLiked = post.PostLikers?.find(v => v.id === myId);
  const hasImage = post.Images.length > 0;
  const utilMenuProps = {
    parentComponentType: 'Post',
    postId: post.id,
    author: post.UserId,
    removeModalOn: removeModalOnOff,
    updateModalOn: updateModalOnOff,
    closeAction: utilMenuOff,
    animation: utilMenuAnimation,
  };


  const commentListOnOff = () => {

    if(throttleRef.current) {
      return;
    }
    if(commentForm && !throttleRef.current) {
      const maxHeight = window.getComputedStyle(commentListWrapperRef.current).getPropertyValue('height');
      setCommentLineMaxheight(maxHeight);
      commentFormAnimationOnOff(prev => !prev);
      throttleRef.current = setTimeout(() => {
        commentFormOnOff();
        clearTimeout(throttleRef.current);
        throttleRef.current = null;
      }, 1100);
    }else {
      commentFormOnOff();
      commentFormAnimationOnOff();
    }
    
  };
      
  const addLike = (postId) => () => {
        
    if(!myId) {
      return alert('로그인 후 사용해 주세요!');
    }
    if(targetPostLiked) { 
      dispatch({
        type: UNLIKE_POST_REQUEST,
        postId
      });
    }else { 
      dispatch({
        type: LIKE_POST_REQUEST,
        postId
      });
    }

  };

  const removePost = (postId) => () => {
       
    dispatch({
      type: REMOVE_POST_REQUEST,
      postId
    });
    removeModalOnOff();
  
  };

   
  return (
    <>
      <S.PostFrameMainContainer>
        <S.Header>
          <button aria-label='utilMenuOnOffButton' onClick={utilMenuOnOff}>
            <img src='/menu_button.svg' alt='menu_button.svg' />
          </button>
        </S.Header>
        <S.UtillMenuWrapper>
          {utilMenu && 
            <UtilMenu {...utilMenuProps} ref={utilMenuRef} />
          }
        </S.UtillMenuWrapper>
        <S.Contents>
          {removeModal && 
            <RemoveActionModal parentComponentType={'Post'} removeAction={removePost(post.id)} closeAction={removeModalOnOff} />
          }
          {updatemodal && 
            <UpdateActionModal post={post} closeAction={updateModalOnOff} /> 
          }
          <S.AvatarWrapper onClick={() => {router.push(`/userprofile/${post.User.nickname}`)}}>
            <UserAvatar profilePicture={post.User.profilePicture} size={'big'} />
          </S.AvatarWrapper>
          <S.PostContents>
            <S.UserInformation>
              <div className='nickname'>
                <Link href={`/userprofile/${post.User.nickname}`}>
                  <a>
                    <p>{post.User.nickname}</p>
                  </a>
                </Link>
              </div>
              <div className='creationDate'>
                {dayjs(post.createdAt).format('YYYY.MM.DD')}
              </div>
            </S.UserInformation>
            <div className='content'>
              <p>{post.content}</p>
            </div>
          </S.PostContents>
        </S.Contents>
        {hasImage &&
          <PostImages images={post.Images} />
        }
        <S.Footer hasImage={hasImage}>
          <S.Actions>
            <div className='actionContainer'>
              <button aria-label='commentOnOffButton' onClick={commentListOnOff}>
                {commentForm 
                  ? <img src='/post_frame_toggle_comment_button.svg' alt='post_frame_toggle_comment_button.svg' />

                  : <div className='comment' />
                }
              </button>
              <p className='commentLength'>{post.Comments.length}</p>
            </div>
            <div className='emptyBox' />
            <div className='actionContainer'>
              <button aria-label='likeButton' onClick={addLike(post.id)}>
                {targetPostLiked 
                  ? <img src='/post_frame_toggle_like_button.svg' alt='post_frame_toggle_like_button.svg' />

                  : <div className='like' />
                }
              </button>
              <p className='likedLength'>{post.PostLikers.length}</p>
            </div>
          </S.Actions>
        </S.Footer>
        {commentForm &&
          <S.CommentListWrapper ref={commentListWrapperRef} animation={commentFormAnimation} maxHeight={commentLineMaxheight}>
            <CommentList postId={post.id} comments={post.Comments} animation={commentFormAnimation} parentMaxHeight={commentLineMaxheight} />
          </S.CommentListWrapper>
        }
      </S.PostFrameMainContainer>
    </>
  );
  
});

  
export default PostFrame;