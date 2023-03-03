import React, { forwardRef, useRef } from 'react';
import * as S from './style';
import { useSelector } from 'react-redux';


const UtilMenu = forwardRef(({ parentComponentType, postId, author, removeModalOn, updateModalOn, closeAction, animation }, toggleRef) => {

  const myId = useSelector(state => state.user.myInformation?.id);
  const copyDelayRef = useRef(null);


  const handleClick = (modalOn, utilMenuOff = closeAction) => () => {

    modalOn();
    utilMenuOff();

  };

  const copyPostUrl = (postUrl) => () => {

    const clipboard = document.createElement('textarea');
    document.body.appendChild(clipboard);
    clipboard.value = postUrl;
    clipboard.select();
    clipboard.setSelectionRange(0, 9999);
    document.execCommand('copy');
    document.body.removeChild(clipboard);
    copyDelayRef.current = setTimeout(() => {
      alert('복사되었습니다!');
      clearTimeout(copyDelayRef.current)
      copyDelayRef.current = null;
    }, 300);
    
  };


  if(parentComponentType === 'post') {
    return (
      <>
        <S.PostUtilMenuMainContainer ref={toggleRef} animation={animation}>
          {author === myId
            ? <>
                <S.PostActionWrapper> 
                  <div className='iconWrapper'>
                    <img src='/util_menu_update_button.svg' alt='util_menu_update_button.svg' />
                  </div>
                  <button aria-label='updatePostModalOnButton' onClick={handleClick(updateModalOn)}>
                    <p>수정</p>
                  </button>
                </S.PostActionWrapper>
                <S.PostActionWrapper>
                  <div className='iconWrapper'>
                    <img src='/util_menu_delete_button.svg' alt='util_menu_delete_button.svg' />
                  </div>
                  <button aria-label='removePostModalOnButton' onClick={handleClick(removeModalOn)}>
                    <p>삭제</p>
                  </button>
                </S.PostActionWrapper>
                <S.PostActionWrapper>
                  <div className='iconWrapper'>
                    <img src='/util_menu_share_button.svg' alt='util_menu_share_button.svg' />
                  </div>
                  <button aria-label='copyPostUrlButton' onClick={handleClick(copyPostUrl(`http://www.seolecat.com/post/${postId}`))}>
                    <p>공유</p>
                  </button>
                </S.PostActionWrapper>
              </>

            : <S.PostActionWrapper>
                <div className='iconWrapper'>
                  <img src='/util_menu_share_button.svg' alt='util_menu_share_button.svg' />
                </div>
                <button aria-label='copyPostUrlButton' onClick={handleClick(copyPostUrl(`http://www.seolecat.com/post/${postId}`))}>
                  <p>공유</p>
                </button>
              </S.PostActionWrapper>    
          }
        </S.PostUtilMenuMainContainer>
      </>
    );
  }else {
    return (
      <>
        <S.CommentUtilMenuMainContainer ref={toggleRef} animation={animation}>
          <S.CommentActionWrapper>
            <div className='iconWrapper'>
              <img src='/util_menu_update_button.svg' alt='util_menu_update_button.svg' />
            </div>
            <button aria-label='updateCommentButton' onClick={handleClick(updateModalOn)}>
              <p>수정</p>
            </button>
          </S.CommentActionWrapper>
          <S.CommentActionWrapper>
            <div className='iconWrapper'>
              <img src='/util_menu_delete_button.svg' alt='util_menu_delete_button.svg' />
            </div>
            <button aria-label='removeCommentModalOnButton' onClick={handleClick(removeModalOn)}>
              <p>삭제</p>
            </button>
          </S.CommentActionWrapper>
        </S.CommentUtilMenuMainContainer>
      </>
    );
  }

});


export default UtilMenu;