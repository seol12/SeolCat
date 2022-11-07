import styled from "styled-components";


export const CommentMainContainer = styled.li`

  width: 100%;
  overflow: hidden;
  border-top: 2px solid #000000;
  background-color: #20232A;
  font-family: 'Noto Sans KR', sans-serif;

`;

export const Header = styled.div`
  
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 3;
  width: 100%;
  height: 28px;
  background-color: #20232A;
  color: #FFFFFF;
  
  & button {
    border: none;
    background: none;
    margin-top: 8px;
    margin-right: 4%;

    & img {
      cursor: pointer;
    };
  };

`;

export const CommentUtilMenuWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;
 
`;

export const Contents = styled.div`

  display: flex;
  width: 100%;
  background-color: #20232A;
  color: #FFFFFF;

`;

export const AvatarWrapper = styled.div`
 
  display: flex;
  justify-content: flex-end;
  margin-right: 14px;
  margin-bottom: 4px;
  margin-left: 4%;
  cursor: pointer;
 
`;

export const CommentContents = styled.div`

  display: flex;
  flex-direction: column;
  width: 70%;

  & .content {
    width: 100%;
    margin-top: 6px;

    & p {
      margin: 0;
      font-weight: 400;
      font-size: 0.8rem;
      color: #FFFFFF;
    };
  };

`;

export const UserInformation = styled.div`
  
  display: flex;
  font-weight: 500;
  font-size: 0.8rem;

  & p {
    margin: 0;
  };

  & div {
    display: inline;
  };

  & .nickname {
    font-size: 0.8rem;
    
    & a {
      color: #FFFFFF;
      text-decoration: none;
    };
  };

  & .creationDate {
    margin-left: 6px;
    color: #A9A9A9;
  };

`;

export const Input = styled.textarea`

  height: 30px;
  border: none;
  border-bottom: 2px solid #A9A9A9;
  background-color: #20232A;
  margin-top: 4px;
  padding: 0;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 0.8rem;
  color: #FFFFFF;
  resize: none;

  ::placeholder {
    padding-top: 2px 0px 0px 0px;
    font-weight: 400;
    font-size: 0.8rem;
    color: #A9A9A9;
  };

  :focus {
    outline: none;

    ::placeholder {
      color: transparent;
    };
  };

`;

export const Actions = styled.div`

  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 28px;

  & button {
    width: 40px;
    height: 22px;
    border: none;
    background: none;
    padding: 0;
    cursor: pointer;
    
    & p {
      margin: 0;
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: 400;
      font-size: 0.7rem;
    };
  };

  & .updateButton {
    border: 1px solid #0080FF;
    margin: 12px 10px 0px 0px;
    color: #0080FF;
  };

  & .cancelButton {
    border: 1px solid #FFFFFF;
    margin-top: 12px;
    color: #FFFFFF;
  };

`;

export const Footer = styled.div`

  width: 100%;
  height: ${(props) => {
    return props.isUpdating ? '18px' : '28px'
  }};
  
`;

