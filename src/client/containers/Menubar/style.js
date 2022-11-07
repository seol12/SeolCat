import styled, { keyframes, css } from "styled-components";


export const MenubarMainContainer = styled.div`

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: 'Noto Sans KR', sans-serif;

`;

export const Header = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 14px;
 
  & button {
    width: 180px;
    height: 38px;
    border: none;
    background: linear-gradient(103deg, #0080FF, #D600FF);
    margin: 10px 0px 10px 0px;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
    color: #FFFFFF;
    cursor: pointer;

    & a {
      color: #FFFFFF;
      text-decoration: none;
    };

    & p {
      margin: 0;
    };
  };

`;

export const MyInformation = styled.div`

  display: flex;
  width: 180px;
  margin: 12px 0px 12px 0px;

`;

export const AvatarWrapper = styled.div`
 
  display: flex;
  justify-content: flex-end;
  margin-bottom: 4px;
  
`;

export const Information = styled.div`

  display: flex;
  flex-direction: column;
  width: 60%;
  margin: 6px 0px 0px 14px;
  text-align: start;
  color: #FFFFFF;

  & p {
    margin: 0;
  };

  & .nickname {
    font-weight: 500;
    font-size: 0.9rem;
  };

  & .userId {
    font-weight: 400;
    font-size: 0.7rem;
    color: #A9A9A9;
  };

`;

export const Contents = styled.div`

  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 5px solid #000000;
  margin-top: 14px;
 
  & .routerItemContainer {
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 3px solid #000000;
  };

`;

export const RouterItem = styled.div`

  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 15%;
  font-family: 'Noto Sans KR', sans-serif;
  
  & img {
    width: 26px;
    height: 24px;
  };

  & p {
    margin: 0px 0px 0px 6px;
    padding: 14px 0px 14px 8px;
    font-size: 1rem;
    color: #FFFFFF;
    cursor: pointer
  };

`;

export const Modalbackgronud = styled.div`

  display: flex;
  position: fixed;
  z-index: 6;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.50);
  padding-top: -10px;

  @media all and (min-width: 1025px) {
    display: none;
  };

`;

const menuBarMoveRightAnimation = keyframes`

  from {
    transform: translateX(0px);
  };

  to {
    transform: translateX(300px);
  };

`;

const menuBarMoveleftAnimation = keyframes`

  from {
    transform: translateX(300px);
  };

  to {
    transform: translateX(0px);
  };

`;

export const MobileMenuBarMainContainer = styled.div`

  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 2;
  left: -300px;
  width: 220px;
  height: 100%;
  background: #20232A;
  color: #FFFFFF;
  transform: ${(props) => {
    return props.animation ? 'translateX(300px)' : 'translateX(0px)'
  }};
  animation: ${(props) => {
    return props.animation ? css`${menuBarMoveRightAnimation} ease-in-out 0.2s` : css`${menuBarMoveleftAnimation} ease-in-out 0.2s`
  }};

`;

export const MobileHeaderWrapper = styled.div`
 
  width: 100%;
 
`;

export const MobileHeader = styled.div`

  display: flex;
  width: 100%;
  height: 36px;
  margin-bottom: 6px;

  & .exitButtonWrapper {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
    width: 22%;

    & button {
      width: 42px;
      height: 26px;
      border: none;
      background: none;
      cursor: pointer;

      & img {
        width: 22px;
        height: 24px;
        margin-top: 1px;
      };
    };
  };

  & .mainLogoWrapper {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    width: 60%;

    & img {
      width: 94px;
    };
  };
 
`;

export const MobileMyInformationWrapper = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 6px 0px 8px 0px;
  font-family: 'Noto Sans KR', sans-serif;
  
  & button {
    width: 180px;
    height: 38px;
    border: none;
    background: linear-gradient(103deg, #0080FF, #D600FF);
    margin-top: 10px;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
    color: #FFFFFF;
    cursor: pointer;

    & a {
      color: #FFFFFF;
      text-decoration: none;
    };
    
    & p {
      margin: 0;
      font-size: 0.9rem;
    };
  };

  & .middleLogoWrapper {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 8px;

    & img {
      width: 40%;
      margin-right: 16px;
    };
  };

`;

