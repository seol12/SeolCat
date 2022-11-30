import styled from 'styled-components';


export const NoResultsFoundMainContainer = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 90%;
  height: calc(100vh - 592px);
  background-color: #20232A;
  margin-top: 4px;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 400;
  font-size: 1.4rem;
  color: #FFFFFF;

  @media all and (max-width: 1024px) {
    width: 100%;
  };

  @media all and (max-width: 375px) {
    height: 50vh;
  };

  & .guide {
    position: absolute;
    top: 50%;
    
    & p {
      margin: 0;
    };
  };
  
`;
