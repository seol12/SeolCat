import React from 'react';
import * as S from './style';


const SearchResult = ({ keyword }) => {

  return (
    <>
      <S.SearchResultMainContainer>
        <S.Header/>
        <S.ContentsContainer>
          <div className='keyword'>
            <p>'{keyword}'</p>
          </div>
          <div className='result'>
            <p>검색결과</p>
          </div>
        </S.ContentsContainer>
        <S.Footer/>
      </S.SearchResultMainContainer>
    </>
  );

};


export default SearchResult;