import React, { useRef } from 'react';
import * as S from './style';
import { useDispatch, useSelector } from 'react-redux';
import { useValueChanged, useUploadImages } from '../../hooks';
import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../../actions/postActions';
import Useravatar from '../../components/UserAvatar';


const PostForm = () => {

  const dispatch = useDispatch();
  const { myInformation } = useSelector(state => state.user);
  const { addPostImageList } = useSelector(state => state.post);
  const imageInput = useRef(null);
  const [postContent, onChangePostContent, initalizePostContent] = useValueChanged('');
  const [inputRerender, uploadImage] = useUploadImages('addPostImageList', UPLOAD_IMAGES_REQUEST);
    

  const addPost = (e) => {

    e.preventDefault();
    if(!postContent || !postContent.trim()) {
      return alert('내용을 작성해 주세요!');
    }
    const formData = new FormData();
    addPostImageList.forEach((v) => {
      formData.append('image', v);
    });
    formData.append('content', postContent);
    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
    initalizePostContent('');

  };

  const inputClick = () => {
        
    imageInput.current.click();
    
  };

  const removePreviewImage = (previewImageIndex) => () => {
        
    dispatch({
      type: REMOVE_IMAGE,
      data: {
        imageIndex: previewImageIndex,
        imageListType: 'addPostImageList',
      },
    });

  };

  
  return (
    <>
      <S.PostFormMainContainer>
        <form type="hidden" encType='multipart/form-data' onSubmit={addPost}>
          <S.Header />
          <S.Contents>
          <S.AvatarWrapper>
            <Useravatar profilePicture={myInformation.profilePicture} size={'big'} />
          </S.AvatarWrapper>
          <S.PostFormContents>
            <textarea placeholder='무슨 생각을 하고 계신가요?' value={postContent} onChange={onChangePostContent} />
            <div className='line' />
            <S.Actions>
              <S.UploadContainer>
                <input type="file" accept="image/*" key={inputRerender} multiple hidden ref={imageInput} onChange={uploadImage} />
                <img src='/image_upload_button.svg' onClick={inputClick} alt='image_upload_button.svg' />
              </S.UploadContainer>
              <div className='emptyBox' />
              <S.SubmitButtonWrapper>
                <button aria-label='submitButton' type='submit'>
                  <p>보내기</p>
                </button>
              </S.SubmitButtonWrapper>
            </S.Actions>
          </S.PostFormContents>
          </S.Contents>
          {addPostImageList.length > 0 && 
            <S.PreviewImagesContainer>
              {addPostImageList.map((v, i) => {
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
      </S.PostFormMainContainer>
    </>
  );

};
     

export default PostForm;