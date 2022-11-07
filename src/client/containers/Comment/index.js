import React, { memo, useRef, useEffect } from 'react';
import * as S from './style';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { usePrevStateChanged, useValueChanged, useHandleClickOutside } from '../../hooks';
import { REMOVE_COMMENT_REQUEST, UPDATE_COMMENT_REQUEST } from '../../actions/commentActions';
import Link from 'next/link';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativetime from 'dayjs/plugin/relativeTime';
import UtilMenu from '../../components/UtilMenu';
import RemoveActionModal from '../RemoveActionModal';
import UserAvatar from '../../components/UserAvatar';


dayjs.locale('ko');
dayjs.extend(relativetime);


const Comment = memo(({ postId, comment }) => {

  const router = useRouter();
  const dispatch = useDispatch();
  const myId = useSelector(state => state.user.myInformation?.id);
  const utilMenuRef = useRef(null);
  const [removeModal, removeModalOnOff] = usePrevStateChanged(false);
  const [updateCommentContent, onChangeUpdateCommentContent, initializeUpdateCommentContent] = useValueChanged('');
  const [commentUpdate, commentUpdateOnOff] = usePrevStateChanged(false);
  const [utilMenu, utilMenuOnOff, utilMenuAnimation, utilMenuOff] = useHandleClickOutside(false, utilMenuRef, false);
  const utilMenuProps = {
    parentComponentType: 'Comment',
    removeModalOn: removeModalOnOff,
    updateModalOn: commentUpdateOnOff,
    closeAction: utilMenuOff,
    animation: utilMenuAnimation,
  };


  useEffect(() => {

    initializeUpdateCommentContent('');

  }, [commentUpdate]);

  const removeComment = (commentId) => () => {
    
    dispatch({
      type: REMOVE_COMMENT_REQUEST,
      postId: postId,
      commentId: commentId,
    });
   
  };
  
  const updateComment = () => {

    if(!updateCommentContent || !updateCommentContent.trim()) {
      return alert('내용을 작성해 주세요!');
    }
    dispatch({
      type: UPDATE_COMMENT_REQUEST,
      commentId: comment.id,
      data: {
        postId: postId,
        content: updateCommentContent,
      },
    });
    initializeUpdateCommentContent('');
    commentUpdateOnOff();

  };


  return (
    <>
      <S.CommentMainContainer>
        <S.Header>
          {myId === comment.UserId &&
            <button aria-label='commentUtilMenuOnOffButton' disabled={commentUpdate} onClick={utilMenuOnOff}>
              <img src='/menu_button.svg' alt='menu_button.svg' />
            </button>
          }
        </S.Header>
          <S.CommentUtilMenuWrapper>
            {utilMenu && 
              <UtilMenu {...utilMenuProps} ref={utilMenuRef} />
            }
          </S.CommentUtilMenuWrapper>
        <S.Contents>
          {removeModal && 
            <RemoveActionModal parentComponentType={'Comment'} removeAction={removeComment(comment.id)} closeAction={removeModalOnOff} />
          }
          <S.AvatarWrapper onClick={() => {router.push(`/userprofile/${comment.User.nickname}`)}}>
            <UserAvatar profilePicture={comment.User.profilePicture} size={'small'} />
          </S.AvatarWrapper>
          <S.CommentContents>
            <S.UserInformation>
              <div className='nickname'>
                <Link href={`/userprofile/${comment.User.nickname}`}>
                  <a>
                    <p>{comment.User.nickname}</p>
                  </a>
                </Link>
              </div>
              <div className='creationDate'>
                <p>{dayjs().to(dayjs(comment.createdAt))}</p>
              </div>
            </S.UserInformation>
            {commentUpdate && myId === comment.UserId
              ? <>
                  <S.Input placeholder={comment.content} value={updateCommentContent} onChange={onChangeUpdateCommentContent} />
                  <S.Actions>
                    <button className='updateButton' aria-label='updateButton' onClick={updateComment}>
                      <p>수정</p>
                    </button>
                    <button className='cancelButton' aria-label='cancelButton' onClick={commentUpdateOnOff}>
                      <p>취소</p>
                    </button>
                  </S.Actions>
                </>

              : <div className='content'>
                  <p>{comment.content}</p>
                </div>
            }
          </S.CommentContents>
        </S.Contents>
        <S.Footer isUpdating={commentUpdate} />
      </S.CommentMainContainer>
    </>
  );

});


export default Comment;