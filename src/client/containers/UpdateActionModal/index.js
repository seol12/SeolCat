import React,{ memo, useRef, useEffect } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useUploadImages, useValueChanged } from '../../hooks';
import { LOAD_POST_IMAGE, REMOVE_IMAGE, UPDATE_POST_REQUEST, UPLOAD_IMAGES_REQUEST } from '../../actions/postActions';
import UserAvatar from '../../components/UserAvatar';


const UpdateActionModal = memo(({ post, closeAction }) => {

  const dispatch = useDispatch();
  const { updatePostImageList } = useSelector(state => state.post);
  const inputRef = useRef(null);
  const backgroundRef = useRef(null);
  const [inputRerender, uploadImages] = useUploadImages('updatePostImageList', UPLOAD_IMAGES_REQUEST);
  const [updatePostContent, onChangeUpdatePostContent] = useValueChanged('');
 

  useEffect(() => {

    dispatch({
      type: LOAD_POST_IMAGE,
      postImages: post.Images,
    });

  }, []);

  const inputClick = () => {

    inputRef.current.click();

  };

  const handleClickBackground = (e) => {
   
    if(e.target === backgroundRef.current) {
      closeAction();
    }else {
      return;
    }

  };

  const removePreviewImage = (previewImageIndex) => () => {

    dispatch({
      type: REMOVE_IMAGE,
      data: {
        imageIndex: previewImageIndex,
        imageListType: 'updatePostImageList',
      }
    });

  };

  const updatePost = (e) => {

    e.preventDefault();
    if(!updatePostContent || !updatePostContent.trim()) {
      return alert('내용을 작성해 주세요!');
    }
    const updatePostFormData = new FormData();
    updatePostImageList.forEach((v) => {
      updatePostFormData.append('image', v)
    });
    updatePostFormData.append('content', updatePostContent);
    dispatch({
      type: UPDATE_POST_REQUEST,
      postId: post.id,
      postData: updatePostFormData,
    });
    closeAction();
  
  };


  return (
    <>
      <S.ModalBackground ref={backgroundRef} onClick={handleClickBackground}>
        <S.UpdateModalMainContainer>
          <form type="hidden" encType='multipart/form-data' onSubmit={updatePost}>
            <S.Header>
              <div className='guide'>
                <p>게시글 수정</p>
              </div>
              <div className='exitButtonWrapper'>
                <button aria-label='updateModalOffButton' type="button" onClick={closeAction}>
                  <img src='/modal_exit_button.svg' alt='modal_exit_button.svg' />
                </button>
              </div>
            </S.Header>
            <S.Contents>
              <S.AvatarWrapper>
                <UserAvatar profilePicture={post.User.profilePicture} size={'big'} />
              </S.AvatarWrapper>
              <S.Input>
                <textarea placeholder={post.content} value={updatePostContent} onChange={onChangeUpdatePostContent} />
                <div className='line'/>
                <S.Actions>
                  <div className='upload'>
                    <input type="file" accept="image/*" multiple hidden key={inputRerender} ref={inputRef} onChange={uploadImages} />
                    <img src='/image_upload_button.svg' onClick={inputClick} alt='image_upload_button.svg' />
                  </div>
                  <S.ButtonsContainer>
                    <button type='button' aria-label='cancelButton' className='cancel' onClick={closeAction}>
                      <p>취소</p>
                    </button>
                    <button type='submit' aria-label='updateButton' className='update'>
                      <p>수정</p>
                    </button>
                  </S.ButtonsContainer>
                </S.Actions>
              </S.Input>
            </S.Contents>
            {updatePostImageList.length > 0 &&
              <S.PreviewImagesContainer>
                {updatePostImageList.map((v, i) => {
                  return (
                    <S.PreviewImage key={v}>
                      <img src={v} alt={v} />
                      <div className='removeButtonWrapper'>
                        <button type='button' aria-label={`removeImageButton/${i}`} onClick={removePreviewImage(i)}>X</button>
                      </div>
                    </S.PreviewImage>
                  )})
                }
              </S.PreviewImagesContainer>  
            }      
          </form>
        </S.UpdateModalMainContainer>
      </S.ModalBackground>
    </>
  );

});


export default UpdateActionModal;