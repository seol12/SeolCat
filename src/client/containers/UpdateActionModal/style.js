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

export const UpdateModalMainContainer = styled.div`

  display: flex;
  flex-direction: column;
  position: relative;
  width: 600px;
  background-color: #20232A;
  
  @media all and (max-width: 767px) {
    width: 90%;
  };

`;

export const Header = styled.div`
  
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  background: #20232A; 

  & .guide {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 5%;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    color: #FFFFFF;

    & p {
      margin: 0;
    };
  };

  & .exitButtonWrapper {
    display: flex;
    justify-content: flex-end;

    & button {
      width: 42px;
      height: 28px;
      border: none;
      background: none;
      margin-top: 24%;
      margin-right: 14%;
      padding: 0;
      font-size: 1.2rem;
      cursor: pointer;

      & img {
        width: 22px;
        height: 24px;
      };
    };
  };
  
`;

export const Contents = styled.div`

  display: flex;
  width: 100%;

`;

export const AvatarWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  margin-right: 3%;
  margin-bottom: 4px;
  margin-left: 4%;
  
`;

export const Input = styled.div`

  display: flex;
  flex-direction: column;
  width: 90%;
  height: 116px;
  margin-top: 14px;
  
  & textarea {
    width: 90%;
    height: 38px;
    border: none;
    background-color: #20232A;
    font-family: 'Noto Sans KR', sans-serif;
    padding: 0px 0px 2px 0px;
    color: #FFFFFF;
    resize: none;

    ::placeholder {
      font-weight: 400;
      font-size: 1rem;
      color: #A9A9A9;
    };

    :focus {
      outline: none;
      
      ::placeholder {
        color: transparent;
      };
    };
  };

  & .line {
    width: 90%;
    border: 1px solid #A9A9A9;
    box-sizing: border-box;
  };

`; 

export const Actions = styled.div`
  
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 20px 0px 10px 0px;
  
  & .upload {
    width: 30%;
    padding-left: 12px;

    & img {
      width: 34px;
      height: 34px;
      cursor: pointer;
    };
  };

`;

export const ButtonsContainer = styled.div`

  display: flex;
  justify-content: flex-end;
  width: 50%;
  font-weight: 500;
  font-size: 1rem;

  @media all and (max-width: 767px) {
    width: 60%;
    font-size: 0.8rem;
  };
  
  & button {
    border: none;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 500;
    cursor: pointer;

    & p {
      margin: 0;
    };
  };

  & .cancel {
    width: 98px;
    height: 30px;
    background: none;
    margin-right: 10%;
    color: #0080FF;
    transition: background-color 0.4s ease-in-out;
    
    :hover {
      background-color: rgba(1, 1, 1, 0.30);
    };
  };

  & .update {
    width: 100px;
    height: 30px;
    background: linear-gradient(103deg, #0080FF, #D600FF);
    color: #FFFFFF;
  };

`;

export const PreviewImagesContainer = styled.div`

  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-top: 2px solid transparent;
  background-image: linear-gradient(#20232a, #20232a), linear-gradient(90deg, #0080FF, #D600FF);
  background-origin: border-box;
  background-clip: content-box, border-box;

`;

export const PreviewImage = styled.div`

  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 124px;
  height: 70px;
  margin: 20px 0px 20px 20px;
  object-fit: cover;

  @media all and (max-width: 767px) {
    width: 90px;
    height: 60px;
  };

  & .removeButtonWrapper {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    width: 100%;
    height: 40px;
  };

  & button {
    width: 16px;
    height: 16px;
    border: none;
    border-radius: 8px 8px;
    background: #0080FF;
    margin: 4px 2px 0px 0px;
    padding: 0px;
    font-weight: bold;
    font-size: 0.1rem;
    color: #FFFFFF;
  };

  & img {
    width: 100%;
    height: 100%;
  };
  
`;

