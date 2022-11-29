import * as S from './style';


const LoadingSpinner = ({ size }) => {

  if(size === 'big') {
    return (
      <>
        <S.BigSizeSpinner />
        <S.ShineGradient />
      </>
    );
  }else {
    return (
      <>
        <S.SmallSizeSpinner />
        <S.ShineGradient />
      </>
    );
  }

};


export default LoadingSpinner;