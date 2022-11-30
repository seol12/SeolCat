import styled, { keyframes } from 'styled-components';


const spinAnimation = keyframes`

  from {
    transform: rotate(0deg);
  };

  to {
    transform: rotate(360deg);
  };

`;

export const BigSizeSpinner = styled.div`

  position: absolute;
  top: calc(54% - 42px);
  left: calc(54% - 42px);
  z-index: 2;
  width: 42px;
  height: 42px;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
  border-top-color: transparent;
  border-left-color: transparent;
  transform-origin: 50%;
  animation: ${spinAnimation} 0.6s infinite linear;

`;

export const SmallSizeSpinner = styled.div`

  position: absolute;
  top: calc(54% - 38px);
  left: calc(54% - 38px);
  z-index: 2;
  width: 38px;
  height: 38px;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
  border-top-color: transparent;
  border-left-color: transparent;
  transform-origin: 50%;
  animation: ${spinAnimation} 0.6s infinite linear;

  @media all and (max-width: 525px) {

    top: calc(54% - 28px);
    left: calc(54% - 28px);
    width: 28px;
    height: 28px;

  };

`;

const moveGradientAnimation = keyframes`

  from { 
    left: -100% 
  };
 
  to { 
    left: 100% 
  };
  
`;

export const ShineGradient = styled.div`

  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(270deg, rgba(128, 128, 128, 0.1), rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09), rgba(128, 128, 128, 0.1));
  animation: ${moveGradientAnimation} 2s infinite ease-in-out;

`;


