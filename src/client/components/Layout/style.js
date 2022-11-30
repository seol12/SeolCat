import styled from 'styled-components';


export const LayoutHeaderContainer = styled.div`

  display: flex;
  position: sticky;
  z-index: 5;
  top: 0;
  width: 100%;
  height: 80px;
  overflow: hidden;
  background: #20232A;
  color: #FFFFFF;

`;

export const HeaderLeft = styled.div`
  
  display: flex;
  justify-content: flex-end;
  width: 24%;

  @media all and (max-width: 1024px) {
    justify-content: space-around;
    width: 100%;
  };
  
`;

export const MobileMenuButton = styled.div`

  display: none;
  
  & button {
    width: 38px;
    height: 38px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;

    & img {
      width: 25px;
      height: 24px;
    };
  };

  @media all and (max-width: 1024px) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14%;
  };

`;

export const LogoWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  @media all and (max-width: 1024px) {
    justify-content: center;
    width: 50%;
  };
 
  & .mainLogo {
    width: auto;
    margin-right: 10%;

    @media all and (max-width: 1024px) {
      display: flex;
      justify-content: center;
      width: 100%;
      margin-right: 0;
    };

    & img {
      width: 138px;
      height: 26px;
      cursor: pointer;
    }; 
  };

`;

export const MobileSearchButtonContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  width: 14%;
  
  @media all and (min-width: 1025px) {
    display: none;   
  };

  & button {
    border: none;
    background: none;

    & .searchButton {
      width: 26px;
      height: 26px;
      cursor: pointer;
    };
  };

`;

export const HeaderMiddle = styled.div`

  width: 40%;

  @media all and (max-width: 1024px) {
    display: none;
  };

`;

export const HeaderRight = styled.div`

  display: flex;
  align-items: center;
  width: 30%;
  
  @media all and (max-width: 1024px) {
    display: none;
  };

`;

export const SearchButtonContainer = styled.div`

  display: flex;
  align-items: center;
  position: relative;
  width: 220px;
  height: 100%;
  overflow: hidden;

  & .searchButtonWrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  };

  & button {
    border: none;
    background: none;
    width: 36px;
    height: 36px;

    & .searchButton {
      width: 26px;
      height: 26px;
      cursor: pointer;
    };
  };
  
`;

export const LayoutContentsContainer = styled.div`

  display: flex;
  width: 100%;

`;

export const LeftContents = styled.div `

  display: flex;
  justify-content: flex-end;
  width: 30%;
  height: 100%;
  text-align: center;

  @media all and (max-width: 1024px) {
    display: none;
  };

  & .menuBarWrapper {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 220px;
    height: 100%;
    background: #20232A;
    margin: 6px 6px 0px 0px;
  };

`;

export const MiddleContents = styled.div`

  display: flex;
  flex-direction: column;
  width: 50%;

  @media all and (max-width: 1024px) {
    width: 100%;
  };

`;

export const RightContents = styled.div`
  
  width: 20%;
  text-align: center;

  @media all and (max-width: 1024px) {
    display: none;
  };
  
`;

export const ScrollTopButton = styled.button`

  display: ${(props) => {
    return props.showUp ? 'block' : 'none'
  }};
  position: fixed;
  z-index: 5;
  top: 90%;
  right: 5%;
  width: 52px;
  height: 52px;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;

  @media all and (max-width: 1024px) {
    top: 86%;
  };
  
  & img {
    width: 100%;
    height: 100%;
  };
  
`;

