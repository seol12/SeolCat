import React from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useValueChanged } from '../../hooks';
import { ADD_COMMENT_REQUEST } from '../../actions/commentActions';
import UserAvatar from '../../components/UserAvatar';


const CommentForm = ({ postId }) => {

  const dispatch = useDispatch();
  const { myInformation } = useSelector(state => state.user);
  const [commentContent, onChangeCommentContent, initializeCommentContent] = useValueChanged('');
    
    
  const addComment = (e) => {
        
    e.preventDefault();
    if(!commentContent || !commentContent.trim()) {
      return alert('내용을 작성해 주세요!');
    }
    dispatch({
      type: ADD_COMMENT_REQUEST,
      postId: postId,
      commentContent: commentContent,
    });
    initializeCommentContent('');

  };

  
  return (
    <>  
      <S.CommentFormMainContainer>
        <form type='hidden' onSubmit={addComment}>
          <S.Header />
          <S.Contents>
            <S.AvatarWrapper>
              <UserAvatar profilePicture={myInformation.profilePicture} size={'small'} />
            </S.AvatarWrapper>
            <S.Input placeholder='댓글을 남겨 보세요.' value={commentContent} onChange={onChangeCommentContent} />
              <S.Action>
                <button aria-label='submitButton' type="submit">
                  <p>보내기</p>
                </button>
              </S.Action>
          </S.Contents>
          <S.Footer />
        </form>
      </S.CommentFormMainContainer>
    </>
  );

};


export default CommentForm;