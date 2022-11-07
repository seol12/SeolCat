import styled from "styled-components";


export const SignupMainContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  font-family: 'Noto Sans KR', sans-serif;

`;

export const Form = styled.form`

  width: 100%;

`;

export const Header = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & .signup {
    margin-bottom: 0;
    font-weight: 700;
    font-size: 2rem;

    @media all and (max-width: 500px) {
      font-size: 1.8rem;
    };
  };

`;

export const Contents = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
 
  & input {
    width: 460px;
    height: 54px;
    border: none;
    margin-top: 10px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #000000;
    text-indent: 10px;

    @media all and (max-width: 500px) {
      width: 80%;
      height: 38px;
    };

    ::placeholder {
      font-weight: 400;
      color: #A9A9A9;
    };

    :focus {
      outline: 2px solid #0080FF;
    };
  };
  
  & input:nth-child(3) {
    margin-top: 20px;
  };

  & button {
    width: 460px;
    height: 54px;
    border: none;
    background: linear-gradient(98deg, #0080FF, #D600FF);
    margin-top: 40px;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.2rem;
    color: #FFFFFF;
    cursor: pointer;

    @media all and (max-width: 500px) {
      width: 80%;
      height: 38px;
      font-size: 0.8rem;
    };

    & p {
      margin: 0;
      font-weight: 700;
    }; 
  };

  & .line {
    width: 460px;
    border: 1px solid #FFFFFF;
    margin-top: 40px;

    @media all and (max-width: 500px) {
      width: 80%;
    };
  };

`;

export const ErrorReason = styled.div`

  display: flex;
  width: 460px;
  margin-top: 4px;

  @media all and (max-width: 500px) {
    width: 80%;
  };

  & p {
    margin: 0;
    font-weight: 400;
    font-size: 0.9rem;
    color: #FF0000;
  };
  
`;

export const Guide = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  width: 460px;
  
  @media all and (max-width: 500px) {
    width: 80%;
  };

  & a {
    color: #0080FF;
    text-decoration: none;
  };

  & p {
    margin: 0;
    padding-top: 12px;
    font-weight: 400;
    font-size: 1rem;

    @media all and (max-width: 500px) {
      font-size: 0.9rem;
    };
  };
 
`;

