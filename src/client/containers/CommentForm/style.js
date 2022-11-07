import styled from 'styled-components';


export const CommentFormMainContainer = styled.li`
  
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #20232A;
  font-family: 'Noto Sans KR', sans-serif;
  
`;

export const Header = styled.div`

  width: 100%;
  height: 18px;

`;

export const Contents = styled.div`

  display: flex;
  width: 100%;
  background-color: #20232A;
  color: #FFFFFF;

`;

export const AvatarWrapper = styled.div`
 
  margin-right: 2%;
  margin-bottom: 4px;
  margin-left: 4%;

  @media all and (max-width: 525px) {
    margin-right: 4%;
  };

`;

export const Input = styled.textarea`

  width: 70%;
  height: 30px;
  border: none;
  border-bottom: 2px solid #A9A9A9;
  background-color: #20232A;
  margin-top: 12px;
  padding: 0px 0px 0px 2px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #FFFFFF;
  resize: none;
 
  ::placeholder {
    color: #A9A9A9;
    font-weight: 500;
    font-size: 0.8rem;
  };

  :focus {
    outline: none;

    ::placeholder {
      color: transparent;
    };
  };

`;

export const Action = styled.div`

  display: flex;
  align-items: center;
  margin-top: 8px;
  margin-right: 4%;
  margin-left: 3%;

  & button {
    width: 100px;
    height: 30px;
    border: none;
    background: linear-gradient(103deg, #0080FF, #D600FF);
    margin-left: 8%;
    font-size: 0.8rem;
    cursor: pointer;

    @media all and (max-width: 424px) {
      width: 80px;
      height: 26px;
      margin-top: 4px;
      font-size: 0.7rem;
    };

    & p {
      margin: 0;
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: 500;
      color: #FFFFFF;
    }; 
  };

`;

export const Footer = styled.div`

  width: 100%;
  height: 18px;
  
`;

