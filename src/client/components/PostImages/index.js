import React, { useState, useEffect } from 'react';
import * as S from './style';
import Image from 'next/image';
import LoadingSpinner from '../LoadingSpinner';
import Slider from '../Slider';


const PostImages = ({ images }) => {

  const [isImageLoading, setImageLoading] = useState(true);


  useEffect(() => {

    setImageLoading(false);

  }, [images]);
  
  const firstImageLoadingComplete = (imageIndex) => () => {
    
    if(imageIndex !== 0) {
      return;
    }
    setImageLoading(false);

  };


  if(images.length === 1) {
    return (
      <>
        <S.PostImagesMainContainer>
          <S.PostImage>
            {isImageLoading &&
              <LoadingSpinner size={'normal'} />
            }
            <Image layout='fill' src={images[0].src} alt={images[0].src} 
              onLoadingComplete={() => {setImageLoading(false)}}
            />
          </S.PostImage>
        </S.PostImagesMainContainer>
      </>
    );
  }else {
    return (
      <>
        <S.PostImagesMainContainer>
          {isImageLoading &&
            <S.TemporaryImage>
              <LoadingSpinner size={'normal'} />
            </S.TemporaryImage>
          }
          <Slider images={images} isFirstImageLoading={isImageLoading} firstImageLoadingComplete={firstImageLoadingComplete} />
        </S.PostImagesMainContainer>
      </>
    );
  }

};


export default PostImages;