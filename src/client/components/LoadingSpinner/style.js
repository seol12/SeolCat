import styled, { keyframes } from "styled-components";


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
  left: calc(54% - 42px);
  top: calc(54% - 42px);
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
  left: calc(54% - 38px);
  top: calc(54% - 38px);
  width: 38px;
  height: 38px;
  border: 4px solid #FFFFFF;
  border-radius: 50%;
  border-top-color: transparent;
  border-left-color: transparent;
  transform-origin: 50%;
  animation: ${spinAnimation} 0.6s infinite linear;

  @media all and (max-width: 525px) {

    left: calc(54% - 28px);
    top: calc(54% - 28px);
    width: 28px;
    height: 28px;

  };

`;

