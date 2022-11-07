import React from 'react';
import * as S from './style';
import Image from 'next/image';
import Slider from '../Slider';


const PostImages = ({ images }) => {
  
  if(images.length === 1) {
    return (
      <>
        <S.PostImagesMainContainer>
          <S.PostImage>
            <Image layout='fill' src={images[0].src} alt={images[0].src} />
          </S.PostImage>
        </S.PostImagesMainContainer>
      </>
    );
  }else {
    return (
      <>
        <S.PostImagesMainContainer>
          <Slider images={images} />
        </S.PostImagesMainContainer>
      </>
    );
  }

};


export default PostImages;