import styled from 'styled-components';


export const ModalBackground = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.50);
  padding-top: -10px;

`;

export const RemoveActionModalMainContainer = styled.div`

  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  height: 188px;
  background-color: #20232A;
  font-family: 'Noto Sans KR', sans-serif;

  @media all and (max-width: 767px) {
    width: 90%;
    height: 168px;
  };

`;

export const Header = styled.div`

  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 70px;

  & button {
    width: 30px;
    height: 30px;
    border: none;
    border-radius: 50%;
    background: none;
    margin: 2.5% 1.7% 0% 0%;
    padding: 0px 0px 4px 0px;
    font-size: 1.2rem;
    cursor: pointer;

    & img {
      width: 22px;
      height: 24px;
    };  
  };

`;

export const Contents = styled.div`

  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;

`;

export const ModalContents = styled.div`

  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;

  & .question {
    border-bottom: 1px solid #FFFFFF;

    & p {
      margin: 0px 0px 16px 0px;
      font-weight: 400;
      font-size: 1.5rem;

      @media all and (max-width: 767px) {
        font-size: 1.2rem;
      };
    };
  };
 
`;

export const Actions = styled.div`

  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 22px;
  
  & button {
    height: 40px;
    margin-left: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    cursor: pointer;

    @media all and (max-width: 767px) {
      height: 30px;
      font-size: 0.9rem;
    };

    & p {
      margin: 0;
    };
  };
  
  & .cancel {
    width: 100px;
    border: none;
    background: none;
    color: #0080FF;
    transition: background-color 0.4s ease-in-out;

    :hover {
      background-color: rgba(1, 1, 1, 0.30);
    };
  };

  & .remove {
    width: 100px;
    border: none;
    background: linear-gradient(103deg, #0080FF, #D600FF);
    color: #FFFFFF;
  };
  
`;

