import React from 'react';
import * as S from './style';


const LoginSignupLayout = ({ children }) => {

  return (
    <>
      <S.Header />
      <S.ContentsContainer>
        <S.LeftContents />
        <S.MiddleContents>
          {children}
        </S.MiddleContents>
        <S.RightContents />
      </S.ContentsContainer>
      <style global jsx>
        {`
          html,
          body,
          body > div:first-child,
          div#__next {
            width: 100%;
            height: 100%;
            margin: 0;
            display: flex;
            flex-direction: column;
            background-color: #20232A;
          };

          input, textarea, button {
            appearance: none;
            -moz-appearance: none;
            -webkit-appearance: none;
            border-radius: 0;
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
          }; 
        `}
      </style>
    </>
  );

};


export default LoginSignupLayout;