import styled, { keyframes, css } from 'styled-components';


const listDownAnimation = keyframes`

  from {
    transform: translateY(-100%);
  };

  to {
    transform: translateY(0%);
  };

`;

const listUpAnimation = (maxHeight) => keyframes`
  
  from {
    transform: translateY(0%);
  };

  to {
    transform: translateY(-${maxHeight});
  };

`;

export const CommentListMainContainer = styled.ul`

  position: relative;
  width: 100%;
  border-top: 2px solid transparent;
  background-image: linear-gradient(#20232a, #20232a), linear-gradient(91deg, #0080FF, #D600FF);
  background-origin: border-box;
  background-clip: content-box, border-box;
  background-color: #20232A;
  margin: 0;
  padding-left: 0;
  animation: ${(props) => {
    return props.animation ? css`${listDownAnimation} ease-in-out 0.4s` : css`${listUpAnimation(props.parentMaxHeight)} ease-in 1s`
  }};
  list-style: none;

  & li:first-child {
    border-top: none;
  };
 
`;

export const Guide = styled.li`

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  border-top: 2px solid #000000;
  background-color: #20232A; 
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 1rem;
  color: #FFFFFF;

`;

