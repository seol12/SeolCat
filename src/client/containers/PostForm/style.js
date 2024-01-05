import styled from 'styled-components';


export const PostFormMainContainer = styled.div`
 
  display: flex;
  flex-direction: column;
  width: 90%;
  box-sizing: border-box;
  border: 1px solid #20232A;
  background-color: #20232A;
  margin-top: 6px;
  font-family: 'Noto Sans KR', sans-serif;
  color: #FFFFFF;

  @media all and (max-width: 1024px) {
    width: 100%;
  };
  
`;

export const Header = styled.div`

  width: 100%;
  height: 50px;

`;

export const Contents = styled.div`

  display: flex;
  width: 100%;

`;

export const AvatarWrapper = styled.div`

  display: flex;
  justify-content: center;
  width: 114px;
  
`;

export const PostFormContents = styled.div`

  display: flex;
  flex-direction: column;
  width: 90%;
  height: 106px;
  margin-top: 14px;

  & textarea {
    height: 36px;
    border: none;
    background-color: #20232A;
    padding: 0;
    font-family: 'Noto Sans KR', sans-serif;
    color: #FFFFFF;
    resize: none;

    ::placeholder {
      font-weight: 500;
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
    box-sizing: border-box;
    border: 1px solid #A9A9A9;
  };
  
`; 

export const Actions = styled.div`

  display: flex;
  justify-content: space-between;
  width: 90%;
  height: 36px;
  margin-top: 20px;

  & .emptyBox {
    width: 30%;
  };

`;

export const UploadContainer = styled.div`

  width: 30%;
  padding-left: 12px;
    
  & img {
    width: 34px;
    height: 34px;
    cursor: pointer;
  };

`;

export const SubmitButtonWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  width: 30%;

  & button {
    width: 98px;
    height: 30px;
    border: none;
    background: linear-gradient(103deg, #0080FF, #D600FF);
    cursor: pointer;

    & p {
      margin: 0;
      font-family: 'Noto Sans KR', sans-serif;
      font-weight: 500;
      font-size: 0.8rem;
      color: #FFFFFF;

      @media all and (max-width: 424px) {
        font-size: 0.7rem;
      };
    };
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
  width: 108px;
  height: 70px;
  margin: 20px 0px 20px 20px;
  object-fit: cover;

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
    font-size: 12px;
    color: #FFFFFF;
    cursor: pointer;
  };

  & img {
    width: 100%;
    height: 100%;
  };

`;

