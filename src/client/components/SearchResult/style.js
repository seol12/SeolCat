import styled from 'styled-components';


export const SearchResultMainContainer = styled.div`

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 90%;
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
  height: 42px;

`;

export const ContentsContainer = styled.div`

  display: flex;
  flex-wrap: wrap;
  width: 95%;
  margin-left: 5%;

  & p {
    margin: 0;
    word-break: break-word;
  };

  & .keyword {
    font-weight: 500;
    font-size: 1.5rem;
  };

  & .result {
    margin-left: 4px;
    font-weight: 500;
    font-size: 1.5rem;
    color: #A9A9A9;
  };
  
`;

export const Footer = styled.div`

  width: 100%;
  height: 42px;
  
`;

