import styled from 'styled-components';


export const ProfileMainContainer = styled.div`

  display: flex;
  flex-direction: column;
  position: relative;
  width: 90%;
  background-color: #20232A;
  margin-top: 6px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #FFFFFF;

  @media all and (max-width: 1024px) {
    width: 100%;
  };

`;

export const MiddleLine = styled.div`

  display: flex;
  position: relative;
  width: 100%;
  height: 62px;
 
  & .avatarWrapper {
    width: 50%;
  };

  & .totalUpdateContainer {
    display: flex;
    justify-content: flex-end;
    position: relative;
    width: 50%;
  };

  & .totalUpdateButtonWrapper {
    position: absolute;
    top: 10px;
    right: 8%;
 
    & button {
      width: 120px;
      height: 40px;
      border: none;
      background: linear-gradient(103deg, #0080FF, #D600FF);
      margin-top: 6px;
      margin-right: 4%;
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: 500;
      font-size: 0.9rem;
      color: #FFFFFF;
      cursor: pointer;

      & p {
        margin: 0;
      };
    };
  };

`;

export const Contents = styled.div`

  display: flex;
  flex-direction: column;
  width: 100%;
  
`;

export const InformationWrapper = styled.div`

  display: flex;
  width: 100%;
  
`;

export const Information = styled.div`
  
  display: flex;
  flex-direction: column;
  width: 60%;
  margin-left: 4%;
  
  & .nickname {
    display: flex;
    font-weight: 500;
    font-size: 1.4rem;
    
    & p {
      margin: 0;
    };
  };

  & .subNickname {
    display: flex;
    align-items: flex-start;
  };

  & .bio {
    display: flex;
    align-items: flex-start;
    margin-top: ${(props) => {
      return props.isUpdating ? '0px' : '14px'
    }};
    margin-bottom: 20px;
  };

`;

export const InformationActions = styled.div`

  display: flex;
  width: 100%;
  margin-bottom: 10px;
  
  & textarea {
    width: 143px;
    height: 26px;
    border: none;
    border-bottom: 2px solid #A9A9A9;
    background-color: #20232A;
    margin: 2px 8px 0px 0px;
    padding: 6px 0px 0px 0px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: ${(props) => {
      return props.contentType === 'subNickname' ? '600' : '500'
    }};
    font-size: 0.7rem;
    color: #FFFFFF;
    resize: none;

    ::placeholder {
      padding-top: 2px;
      font-size: 0.8rem;
      color: #A9A9A9;
    };

    :focus {
      outline: none;

      ::placeholder {
        color: transparent;
      };
    };
  };

  & button {
    width: 40px;
    height: 22px;
    background: none;
    margin-top: 16px;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 0.7rem;
    cursor: pointer;

    & p {
      margin: 0;
    };
  };

  & .cancelButton {
    border: 1px solid #FFFFFF;
    color: #FFFFFF;
  };

  & .changeButton {
    border: 1px solid #0080FF;
    margin-right: 6px;
    color: #0080FF;
  };

`;

export const UpdateButton = styled.button`
  
  display: ${(props) => {
    return props.isUpdating ? 'none' : 'block'
  }};
  width: 40px;
  height: 22px;
  border: 1px solid #0080FF;
  background: none;
  margin-left: 14px;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  color: #0080FF;
  cursor: pointer;

  & p {
    margin: 0;
    font-size: 0.7rem;
  };
  
`;

export const ChangePostsActions = styled.div`

  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 30px;
  
  & button {
    height: 30px;
    border: none;
    background: none;
    margin-left: 4%;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 0.8rem;
    color: #FFFFFF;
    cursor: pointer;

    & p {
      margin: 0;
    };
  };

  & .posts {
    width: 60px;
    font-weight: 400;
  };

  & .togglePosts {
    width: 60px;
    border-bottom: 4px solid #0080FF;
    font-weight: 600;
  };

  & .likedPosts {
    width: 100px;
    font-weight: 400;
  };
  
  & .toggleLikedPosts {
    width: 100px;
    border-bottom: 4px solid #FF7494;
    font-weight: 600;
  };

`;

