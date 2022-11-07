import styled from "styled-components";


export const SliderItemsContainer = styled.div`

  position: relative;
  width: 70%;
  overflow: hidden;

`;

export const Actions = styled.div`

  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;

  & button {
    width: 42px;
    height: 42px;
    border: none;
    background-color: rgba(0,0,0,0.3);
    transition: background-color 0.5s ease-in-out;
    cursor: pointer;

    @media all and (max-width: 530px) {
      width: 28px;
      height: 28px;
    };

    :hover {
      background-color: rgba(0,0,0,0.7);
    };

    & img {
      width: 13px;
      height: 25px;

      @media all and (max-width: 530px) {
        width: 14px;
        height: 14px;
      };
    };
  };

  .prevButton {
    padding: 4px 6px 0px 0px;
  };

  .nextButton {
    padding: 4px 0px 0px 6px;
  };
  
`;

export const ImagesContainer = styled.div`

  display: flex;
  position: relative;
  overflow: hidden;
  transition: margin-left 0.5s ease-in-out;
 
`;

export const ImageWrapper = styled.div`

  position: relative;
  width: 100%;
  overflow: hidden;
  
`;

export const ImageItem = styled.div`

  position: relative;
  width: 100%;
  padding-bottom: 57.1%; 

  & img {
    position: absolute;
    width: 100%;
    height: 100%;
  };

`;

export const DotContainer = styled.div`

  display: flex;
  justify-content: center;
  width: 100%;
  margin: 8px 0px 2px 0px;

`;

export const DotItemsContainer = styled.div`

  display: flex;
  justify-content: center;
  width: 70%;
  height: 12px;
 
`;

export const DotItem = styled.button`

  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: none;
  background: none;
  background-image: url('${(props) => { 
    return props.toggle ? '/slider_toggle_dot_button.svg' : '/slider_dot_button.svg'
  }}');
  background-repeat: no-repeat;
  background-size: auto;
  margin-left: 4px;
  padding: 0;
  transition: background-image 0.4s ease-in-out;
  cursor: pointer;

`;

