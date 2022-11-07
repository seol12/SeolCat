import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const useValueChanged = (initialValue) => {
    
  const [value, setter] = useState(initialValue);
  
  
  const onChangeHandler = (e) => {
    
    setter(e.target.value);

  };

  return [value, onChangeHandler, setter];

}

export const usePrevStateChanged = (initialValue) => {

  const [value, setter] = useState(initialValue);


  const toggleHandler = () => {

    setter(prev => !prev);

  };

  return [value, toggleHandler, setter];
    
}

export const useHandleClickOutside = (initialValue, ref, animationValue) => {

  const unMounttimer = useRef(null);
  const [value, setter] = useState(initialValue);
  const [animation, animationOnOff] = useState(animationValue);


  const toggleHandler = () => {

    if(value) {
      return;
    }else {
      setter(prev => !prev);
      animationOnOff(prev => !prev);
    }
   
  };

  const closeHandler = () => {

    animationOnOff(false);
    unMounttimer.current = setTimeout(() => {
      setter(false);
    }, 200);

  };

  const handleClickOutside = (e) => {

    if(value && (ref.current && !ref.current.contains(e.target))) {
      if(value && animation) {
        closeHandler();
      }
    }

  };

  useEffect(() => {
   
    document.body.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.body.removeEventListener("mousedown", handleClickOutside);
      clearTimeout(unMounttimer);
      unMounttimer.current = null;
    };

  }, [value, animation, ref]);

  return [value, toggleHandler, animation, closeHandler];

}

export const useValidation = (initialValue, type, pageType) => {

  const [value, setter] = useState(initialValue);
  const [errorReason, setErrorReason] = useState('');
  let onChangeHandler;
  let onBlurHandler;


  if(pageType === 'signup' && type === '아이디') {
    onChangeHandler = (e) => {

      if((/[ㄱ-힣]/g).exec(e.target.value) || (/^[0-9]+$/g).test(e.target.value)) {
        setter(e.target.value);
        setErrorReason('영문 또는 영문 + 숫자 조합만 가능합니다.');
      }else {
        setter(e.target.value);
        setErrorReason('');
      }

    };
  }else {
    onChangeHandler = (e) => {
    
      setter(e.target.value);
      setErrorReason('');

    };
  }
  if(pageType === 'signup') {
    onBlurHandler = () => {
  
      if(!value) {
        setErrorReason('필수 항목입니다.');
      }else if(!value.trim() || value.includes(' ')) {
        setErrorReason('공백은 포함시킬 수 없습니다.');
      }
  
    };
  }else {
    onBlurHandler = () => {

      if(!value) {
        setErrorReason(`${type}를 입력해 주세요.`);
      }else {
        return;
      }

    };
  }
 
  return [value, onChangeHandler, onBlurHandler, errorReason, setErrorReason];

}

export const useScreenSize = () => {

  const screenSize = () => {

    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  
  };

  useEffect(() => {

    screenSize();
    window.addEventListener('resize', screenSize);
    return () => {
      window.removeEventListener('resize', screenSize);
    }

  }, []);

}

export const useUploadImages = (imageListType, action) => {

  const dispatch = useDispatch();
  const imageList = useSelector(state => state.post[`${imageListType}`]);
  const [inputRerender, setInputRerender] = useState(false);


  const uploadImageHandler = (e) => {

    if(e.target.files) {
      if(imageList.length > 4) {
        setInputRerender(prev => !prev);
        return alert('이미지는 최대 5개까지 첨부 가능해요!');
      }
      const imageFormData = new FormData();
      const imageData = [];
      const maxImages = 4;
      const prevImages = imageList.length -1;
      if(prevImages + e.target.files.length > maxImages) {
        if(prevImages < maxImages) {
          const nextImages = maxImages - prevImages;
          for(let i = 0; i < nextImages; i++) {
            const mimeType = e.target.files[i].type.split('/')[0];
            if(mimeType !== 'image') {
              alert('이미지 파일만 첨부 가능해요!');
              continue;
            }
            imageData.push(e.target.files[i]);      
          }
        }else {
          setInputRerender(prev => !prev);
          return alert('이미지는 최대 5개까지 첨부 가능해요!');
        }
      }else {
        for(let i = 0; i < e.target.files.length; i++) {
          const mimeType = e.target.files[i].type.split('/')[0];
          if(mimeType !== 'image') {
            alert('이미지 파일만 첨부 가능해요!');
            continue;
          }
          imageData.push(e.target.files[i]); 
        }
      }
      imageData.forEach((v) => {
        imageFormData.append('image', v);
      });
      dispatch({
        type: action,
        data: {
          images: imageFormData,
          imageListType: `${imageListType}`,
        },
      });
      setInputRerender(prev => !prev);
    }
  };

  return [inputRerender, uploadImageHandler];

}

