import styled, { keyframes, css } from 'styled-components';


const menuDownAnimation = keyframes`

  from {
    transform: translateY(0px);
  };

  to {
    transform: translateY(60px);
  };

`;

const menuUpAnimation = keyframes`

  from {
    transform: translateY(60px);
  };

  to {
    transform: translateY(0px);
  };

`;

export const PostUtilMenuMainContainer = styled.div`
  
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  top: -60px;
  right: 2px;
  width: 96px;
  border: 2px solid #FFFFFF;
  background-color: #20232A;
  transform: ${(props) => {
    return props.animation ? 'translateY(60px)' : 'translateY(0px)'
  }};
  animation: ${(props) => {
    return props.animation ? css`${menuDownAnimation} ease-in-out 0.2s` : css`${menuUpAnimation} ease-in-out 0.2s`
  }};

`;

export const PostActionWrapper = styled.div`
  
  display: flex;
  justify-content: center;
  width: 100%;
  height: 24px;
  margin-top: 4px;

  :nth-last-child(1) {
    margin-bottom: 10px;  
  };

  & .iconWrapper {
    width: 34px;
    height: 34px;
 
    & img {
      width: 100%;
      height: 100%;
    };
  };

  & button {
    border: none;
    background: none;
    margin-top: 4px;
    padding: 0px 6px 0px 0px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    color: #FFFFFF;
    cursor: pointer;

    & p {
      margin: 2px 0px 0px 0px;
    };
  };
  
`;

export const CommentUtilMenuMainContainer = styled.div`
  
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 2;
  top: -52px;
  right: 2px;
  width: 96px;
  border: 2px solid #FFFFFF;
  background-color: #20232A;
  transform: ${(props) => {
    return props.animation ? 'translateY(60px)' : 'translateY(0px)'
  }};
  animation: ${(props) => {
    return props.animation ? css`${menuDownAnimation} ease-in-out 0.2s` : css`${menuUpAnimation} ease-in-out 0.2s`
  }};

`;

export const CommentActionWrapper = styled.div`

  display: flex;
  justify-content: center;
  width: 100%;
  height: 28px;
  margin-top: 2px;

  :nth-last-child(1) {
    margin-bottom: 2px;
  };

  & .iconWrapper {
    width: 32px;
    height: 30px;
 
    & img {
      width: 100%;
      height: 100%;
    };
  };

  & button {
    border: none;
    background: none;
    padding: 0px 6px 0px 0px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 400;
    font-size: 0.8rem;
    color: #FFFFFF;
    cursor: pointer;

    & p {
      margin: 0;
    };
  };

`;

