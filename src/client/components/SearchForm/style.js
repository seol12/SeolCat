import styled, { keyframes, css } from 'styled-components';


const searchFormMoveLeftAnimation = keyframes`

  from {
    transform: translateX(120px);
  };

  to {
    transform: translateX(0px);
  };

`;

const mobileSearchFormDownAnimation = keyframes`

  from {
    transform: translateY(-50px);
  };

  to {
    transform: translateY(0px);
  };

`;

export const SearchFormMainContainer = styled.div`  
  
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 2;
  top: 28%;
  width: 220px;
  height: 38px;
  border-radius: 6px;
  background-color: #000000;
  transform: ${(props) => {
    return props.isOpend ? 'translateX(0px)' : 'translateX(220px)'
  }};
  animation: ${(props) => {
    return props.isOpend ? css`${searchFormMoveLeftAnimation} ease-in-out 0.2s` : 'none'
  }};
  
  & .searchButton {
    width: 24px;
    height: 22px;
    margin: 4px 10px 0px 8px;
    cursor: pointer;
  };

`;

export const SearchInput = styled.input`

  width: ${(props) => {
    return props.mode === 'PC' ? '150px' : '90%'
  }};
  border: none;
  background-color: #000000;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  color: #FFFFFF;

  :focus {
    outline: none;

    ::placeholder {
        color: transparent;
      };
  };
 
`;

export const InitializeButton = styled.button`

  width: 30px;
  height: 30px;
  border: none;
  background: none;
  margin: 4px 4px 0px 0px;
  cursor: pointer;

  & img {
    width: 18px;
    height: 16px;
    margin: 0px 0px 2px 0px;
  };

`;

export const MobileSearchFormMainContainer = styled.div`

  display: ${(props) => {
    return props.isOpend ? 'flex' : 'none'
  }};
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  background-color: #20232A;
  margin-top: 6px;
  transform: ${(props) => {
    return props.isOpend ? 'translateY(0px);' : 'translateY(-70px)'
  }};
  animation: ${(props) => {
    return props.isOpend ? css`${mobileSearchFormDownAnimation} ease-in-out 0.3s` : 'none'
  }};
  
  @media all and (min-width: 1025px) {
    display: none;
  };

`;

export const SearchContainer = styled.div`

  display: flex;
  align-items: center;
  width: 80%;
  height: 40px;
  border-radius: 4px;
  background-color: #000000;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.8rem;
  color: #FFFFFF;

  & .searchButton {
    width: 24px;
    height: 22px;
    margin: 4px 10px 0px 8px;
    cursor: pointer;
  };

`;

