import React, { useRef, useState, useEffect } from 'react';
import * as S from './style';
import Image from 'next/image';
import LoadingSpinner from '../LoadingSpinner';
import Slider from '../Slider';


const PostImages = ({ images }) => {

  const isMountedRef = useRef(false); 
  const [isImageLoading, setImageLoading] = useState(true);


  useEffect(() => {

    if(!isMountedRef.current) {
      isMountedRef.current = true;
    }else {
      setImageLoading(true);
    }

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
          {isImageLoading &&
            <S.SkeletonImage>
              <LoadingSpinner size={'normal'} />
            </S.SkeletonImage>
          }
          <S.PostImage isImageLoading={isImageLoading}>
            <Image layout='fill' key={`imageId/${images[0].id}/imageIndex/${0}/isImageLoading/${isImageLoading}`} src={images[0].src} alt={images[0].src} 
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
            <S.SkeletonImage>
              <LoadingSpinner size={'normal'} />
            </S.SkeletonImage>
          }
          <Slider images={images} isFirstImageLoading={isImageLoading} firstImageLoadingComplete={firstImageLoadingComplete} />
        </S.PostImagesMainContainer>
      </>
    );
  }

};


export default PostImages;