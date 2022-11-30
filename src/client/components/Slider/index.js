import React, { useRef, useState, useEffect } from 'react';
import * as S from './style';
import Image from 'next/image';


const Slider = ({ images, isFirstImageLoading, firstImageLoadingComplete }) => {

  const imagesContainerRef = useRef(null);
  const [sliderCount, setSliderCount] = useState(0);
  const [dot, setDot] = useState([]);
  const cloneImages = [images[images.length -1], ...images, images[0]];

  
  const moveImage = (movementType, dotIndex) => {
    
    switch(movementType) {
      case 'initialize': {
        imagesContainerRef.current.style.width = `${cloneImages.length}00%`;
        imagesContainerRef.current.style.transition = 'none';
        imagesContainerRef.current.style.marginLeft = `-100%`;
        break;
      };
      case 'moveRight': {
        if(dotIndex >= 0) {
          imagesContainerRef.current.style.marginLeft = `-${dotIndex +1}00%`;
          imagesContainerRef.current.style.transition = 'margin-left 0.5s ease-in-out';
        }else {
          imagesContainerRef.current.style.marginLeft = `-${sliderCount +2}00%`;
          imagesContainerRef.current.style.transition = 'margin-left 0.5s ease-in-out';
        }
        break;
      };
      case 'moveLeft': {
        if(dotIndex >= 0) {
          imagesContainerRef.current.style.marginLeft = `-${dotIndex +1}00%`;
          imagesContainerRef.current.style.transition = 'margin-left 0.5s ease-in-out';
        }else {
          imagesContainerRef.current.style.marginLeft = `-${sliderCount}00%`;
          imagesContainerRef.current.style.transition = 'margin-left 0.5s ease-in-out';
        }
        break;
      };
      case 'startPosition': {
        imagesContainerRef.current.style.transition = 'none';
        imagesContainerRef.current.style.marginLeft = `0%`;
        const moveToFirstImage = setTimeout(() => {
          imagesContainerRef.current.style.transition = 'margin-left 0.5s ease-in-out';
          imagesContainerRef.current.style.marginLeft = '-100%';
          clearTimeout(moveToFirstImage);
        }, 0);
        break;
      };
      case 'endPosition': {
        imagesContainerRef.current.style.transition = 'none';
        imagesContainerRef.current.style.marginLeft = `-${cloneImages.length -1}00%`;
        const moveToLastImage = setTimeout(() => {
          imagesContainerRef.current.style.transition = 'margin-left 0.5s ease-in-out';
          imagesContainerRef.current.style.marginLeft = `-${cloneImages.length -2}00%`;
          clearTimeout(moveToLastImage);
        }, 0);
        break;
      };
    }

  };

  useEffect(() => {

    moveImage('initialize');
    const initializeDot = images.map((v, i) => {
      return i === 0 ? true : false
    });
    setSliderCount(0);
    setDot(initializeDot);
    
  }, [images]);
  
  const updateDotCount = (dotIndex) => { 

    return dot.map((v, i) => {
      return dotIndex === i  ? true : false
    });
  
  };

  const nextSlide = () => {

    if(sliderCount === images.length -1) {
      moveImage('startPosition');
      setSliderCount(0);
      setDot(updateDotCount(0));
    }else {
      moveImage('moveRight');
      setSliderCount(prev => prev +1);
      setDot(updateDotCount(sliderCount +1));
    }

  };

  const prevSlide = () => {

    if(sliderCount === 0) {
      moveImage('endPosition');
      setSliderCount(images.length -1);
      setDot(updateDotCount(images.length -1));
    }else {
      moveImage('moveLeft');
      setSliderCount(prev => prev -1);
      setDot(updateDotCount(sliderCount -1));
    }

  };

  const toggleDot = (dotIndex) => () => {

    if(dotIndex === sliderCount) {
      return;
    }
    if(dotIndex > sliderCount) {
      moveImage('moveRight', dotIndex);
      setSliderCount(dotIndex);
      setDot(updateDotCount(dotIndex));
    }else {
      moveImage('moveLeft', dotIndex);
      setSliderCount(dotIndex);
      setDot(updateDotCount(dotIndex));
    }

  };


  return (
    <>
      <S.SliderItemsContainer isFirstImageLoading={isFirstImageLoading}>
        <S.Actions>
          <button className='prevButton' aria-label='prevButton' onClick={prevSlide}>
            <img src='/slider_prev_button.svg' alt='slider_prev_button.svg' />
          </button>
          <button className='nextButton' aria-label='nextButton' onClick={nextSlide}>
            <img src='/slider_next_button.svg' alt='slider_next_button.svg' />
          </button>
        </S.Actions>
        <S.ImagesContainer ref={imagesContainerRef}>
          {cloneImages.map((v, i) => {
            return (
              <S.ImageWrapper key={`imageWrapper/imageId/${v.id}/imageIndex/${i}`}>
                <S.ImageItem>
                  <Image layout='fill' key={`imageId/${v.id}/imageIndex/${i}/isFirstImageLoading/${isFirstImageLoading}`} src={cloneImages[i].src} alt={cloneImages[i].src} 
                    onLoadingComplete={firstImageLoadingComplete(i)}
                  />
                </S.ImageItem>
              </S.ImageWrapper>
            )})
          }
        </S.ImagesContainer>
      </S.SliderItemsContainer>
      <S.DotContainer>
        <S.DotItemsContainer>
          {dot.map((v, i) => {
            return (
              <S.DotItem aria-label={`dotButton/${i}`} key={`dotIndex/${i}`} toggle={dot[i]} onClick={toggleDot(i)} />
            )})
          }
        </S.DotItemsContainer>
      </S.DotContainer>
    </>
  );

};


export default Slider;