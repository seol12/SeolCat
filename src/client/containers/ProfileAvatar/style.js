import styled from 'styled-components';


export const ProfileAvatarMainContainer = styled.div`
  
  display: flex;
  position: absolute;
  z-index: 1;
  top: -80%;
  left: 4%;
  width: 108px;
  height: 104px;
 
`;

export const AvatarWrapper = styled.div`

  position: relative;
  width: 104px;
  height: 104px;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px solid #20232A;
  border-radius: 50%;
  background-color: #FFFFFF;
 
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  };

`;

export const Actions = styled.div`
  
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 3;
  width: 104px;
  height: 104px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  
  & button {
    border: none;
    background: none;
    cursor: pointer;
  };

  & .change {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 30%;
    width: 100%;

    & img {
      width: 38px;
      height: 38px;
    };
  };
  
  & .initalize {
    position: absolute;
    top: 74%;
    left: 72%;
    width: 100%;

    & img {
      width: 22px;
      height: 22px;
    };
  };
  
`;

export const DefaultAvatarWrapper = styled.div`

  position: relative;
  width: 104px;
  height: 104px;
  box-sizing: border-box;
  overflow: hidden;
  border: 2px solid #20232A;
  border-radius: 50%;
  background-color: #808080;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  };

`;

