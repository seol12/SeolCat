import React from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';
import CommentForm from '../../containers/CommentForm';
import Comment from '../../containers/Comment';


const CommentList = ({ postId, comments, animation, parentMaxHeight }) => {
    
  const { myInformation } = useSelector(state => state.user);
  
    
  if(comments.length > 0 ) {
    return (
      <>
        <S.CommentListMainContainer animation={animation} parentMaxHeight={parentMaxHeight}>
          {myInformation &&
            <CommentForm postId={postId} />
          }
          {comments.map((v) => {
            return (
              <Comment key={`commentId/${v.id}`} postId={postId} comment={v} />
            )})
          }
        </S.CommentListMainContainer>
      </>
    );
  }else {
    return (
      <>
        <S.CommentListMainContainer animation={animation} parentMaxHeight={parentMaxHeight}>
          {myInformation &&
            <CommentForm postId={postId} />
          }
          <S.Guide>댓글이 존재하지 않습니다</S.Guide>
        </S.CommentListMainContainer>
      </>
    );
  }

};


export default CommentList;