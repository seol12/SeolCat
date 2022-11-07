import styled from 'styled-components';


export const LoginMainContainer = styled.div`

  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;

  & button {
    width: 460px;
    height: 54px;
    border: none;
    background: linear-gradient(98deg, #0080FF, #D600FF);
    margin-top: 40px;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    color: #FFFFFF;
    cursor: pointer;

    @media all and (max-width: 500px) {
      width: 80%;
      height: 38px;
    };

    & p {
      margin: 0;
      font-weight: 700;
      font-size: 1.2rem;

      @media all and (max-width: 500px) {
        font-size: 0.9rem;
      };
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

export const Form = styled.form`

  width: 100%;

`;

export const Header = styled.div`

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  & .mainLogoWrapper {
    width: 240px;
    cursor: pointer;

    @media all and (max-width: 500px) {
      width: 200px;
      margin-top: 8%;
    };

    & img {
      width: 100%;
      height: 100%;
    };
  };
  
  & p {
    margin: 60px 0px 0px 0px;
    font-size: 2rem;
    font-weight: 700;

    @media all and (max-width: 500px) {
      font-size: 1.8rem;
      margin-top: 50px;
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
    margin-top: 20px;
    font-family: 'Noto Sans KR', sans-serif;
    color: #000000;
    text-indent: 10px;

    @media all and (max-width: 500px) {
      width: 80%;
      height: 42px;
    };

    ::placeholder {
      color: #A9A9A9;
    };

    :focus {
      outline: 2px solid #0080FF;
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
    font-weight: 100;
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
    font-size: 1rem;
    font-weight: 400;

    @media all and (max-width: 500px) {
      font-size: 0.9rem;
    };
  };

`;

