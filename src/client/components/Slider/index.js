import React, { useRef, useState, useEffect } from "react";
import * as S from './style';
import Image from "next/image";


const Slider = ({ images, isFirstImageLoading, firstImageLoadingComplete }) => {

  const imagesContainerRef = useRef(null);
  const [sliderCount, setSliderCount] = useState(0);
  const [dot, setDot] = useState([]);


  useEffect(() => {
    
    imagesContainerRef.current.style.width = `${images.length}00%`;
    imagesContainerRef.current.style.marginLeft = `0%`;
    setSliderCount(0);
    const initializeDot = images.map((v, i) => {
      return i === 0 ? true : false;
    });
    setDot(initializeDot);
    
  }, [images]);
  
  useEffect(() => {
    
    imagesContainerRef.current.style.marginLeft = `-${sliderCount}00%`;
    
  }, [sliderCount]);
  
  const updateDotCount = (toggleDotIndex) => { 

    return dot.map((v, i) => {
      return toggleDotIndex === i  ? true : false
    });
  
  };

  const nextSlide = () => {

    if(sliderCount >= images.length -1) {
      setSliderCount(0);
      setDot(updateDotCount(0));
    }else {
      setSliderCount(prev => prev +1);
      setDot(updateDotCount(sliderCount +1));
    }

  };

  const prevSlide = () => {

    if(sliderCount === 0) {
      setSliderCount(images.length -1);
      setDot(updateDotCount(images.length -1));
    }else {
      setSliderCount(prev => prev -1);
      setDot(updateDotCount(sliderCount -1));
    }

  };

  const toggleDot = (toggleDotIndex) => () => {

    setSliderCount(toggleDotIndex);
    setDot(updateDotCount(toggleDotIndex));

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
          {images.map((v, i) => {
            return (
              <S.ImageWrapper key={v.id}>
                <S.ImageItem>
                  <Image layout="fill" key={v.id} src={images[i].src} alt={images[i].src} 
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
              <S.DotItem aria-label={`dotButton/${i}`} key={i} toggle={dot[i]} onClick={toggleDot(i)} />
            )})
          }
        </S.DotItemsContainer>
      </S.DotContainer>
    </>
  );

};


export default Slider;