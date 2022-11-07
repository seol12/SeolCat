import React, { useRef } from 'react';
import * as S from './style';


const RemoveActionModal = ({ parentComponentType, removeAction, closeAction }) => {

  const backgroundRef = useRef(null);


  const handleClickBackground = (e) => {
   
    if(e.target === backgroundRef.current) {
      closeAction();
    }else {
      return;
    }

  };


  return (
    <>
      <S.ModalBackground ref={backgroundRef} onClick={handleClickBackground}>
        <S.RemoveActionModalMainContainer>
          <S.Header>
            <button aria-label='removeModalOffButton' onClick={closeAction}>
              <img src='/modal_exit_button.svg' alt='modal_exit_button.svg' />
            </button>
          </S.Header>
          <S.Contents>
            <S.ModalContents>
              <div className='question'>
                {parentComponentType === 'Post'
                  ? <p>게시글을 삭제하시겠습니까?</p>
                  
                  : <p>댓글을 삭제하시겠습니까?</p>
                }
              </div>
              <S.Actions>
                <button className='cancel' aria-label='cancelButton' onClick={closeAction}>
                  <p>취소</p>
                </button>
                <button className='remove' aria-label='removeButton' onClick={removeAction}>
                  <p>삭제</p>
                </button>
              </S.Actions>
            </S.ModalContents>
          </S.Contents>
        </S.RemoveActionModalMainContainer>
      </S.ModalBackground>
    </>
  );
  
};


export default RemoveActionModal;