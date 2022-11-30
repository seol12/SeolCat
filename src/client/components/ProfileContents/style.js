import styled from 'styled-components';


export const SubNickname = styled.div`

  display: flex;
  max-width: 60%;
  margin-top: 0px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 600;
  
  & p {
    border-radius: 3px;
    margin: 0;
    padding: 0px 2px 0px 2px;
    font-size: 0.9rem;
    color: #A9A9A9;
  };

  & button {
    width: 34px;
    height: 26px;
    border: none;
    background: none;
  };
  
  & img {
    width: 100%;
    height: 100%;
  };

`;

export const Bio = styled.div`

  display: flex;
  flex-wrap: wrap;
  max-width: 60%;
  margin-top: 4px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 500;
  font-size: 0.8rem;

  & p {
    margin: 0;
    word-break: break-word;
  };

`;

