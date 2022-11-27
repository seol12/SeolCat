import * as S from './style';


const LoadingSpinner = ({ size }) => {

  if(size === 'big') {
    return (
      <>
        <S.BigSizeSpinner />
      </>
    );
  }else {
    return (
      <>
        <S.SmallSizeSpinner />
      </>
    );
  }

};


export default LoadingSpinner;