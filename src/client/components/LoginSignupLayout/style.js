import styled from 'styled-components';


export const Header = styled.div`

  width: 100%;
  height: 16%;
  box-sizing: border-box;
  color: #FFFFFF;
  
  @media all and (max-width: 424px) {
    height: 5%;
  };

`;

export const ContentsContainer = styled.div`

  display: flex;
  width: 100%;
  box-sizing: border-box;
  color: #FFFFFF;

`;

export const LeftContents = styled.div`
  
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  text-align: center; 
  
  @media all and (max-width: 767px) {
    display: none;
  };

`;

export const MiddleContents = styled.div`
  
  display: flex;
  width: 60%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;

  @media all and (max-width: 767px) {
    width: 100%;
  };

`;

export const RightContents = styled.div`
  
  width: 20%;
  height: 100%;
  box-sizing: border-box;
  text-align: center;
  
  @media all and (max-width: 767px) {
    display: none;
  };
  
`;

