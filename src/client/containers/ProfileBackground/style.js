import styled from 'styled-components';


export const ProfileBackgroundMainContainer = styled.div`
  
  display: flex;
  width: 100%;
  height: 300px;
 
`;

export const BackgroundWrapper = styled.div`

  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  background-color: #808080;
  opacity: ${(props) => {
    return props.isUpdating ? '80%' : '100%'
  }};

`;

export const SkeletonBackground = styled.div`

  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

`;

export const Background = styled.div`

  position: relative;
  width: 100%;
  height: ${(props) => {
    return props.isImageLoading ? '0%' : '100%'
  }};

  & img {
    width: 100%;
    height: 100%;
  };

`;

export const Actions = styled.div`

  position: absolute;
  width: 100%;
  height: 300px;

  & .change {
    display: flex;
    justify-content: center;
    position: absolute;
    top: 40%;
    width: 100%;

    & button {
      border: none;
      background: none;
      cursor: pointer;

      & img {
        width: 62px;
        height: 62px;
      };
    };
  };

  & .initialize {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    top: 4%;
    width: 100%;
 
    & button {
      border: none;
      background: none;
      cursor: pointer;
      margin-right: 1%;
      
      & img {
        width: 32px;
        height: 32px;
      };
    };
  };
  
`;

export const DefaultBackground = styled.div`

  width: 100%;
  background-color: #808080;

`;

