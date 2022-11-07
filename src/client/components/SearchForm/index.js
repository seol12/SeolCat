import React, { useEffect } from 'react';
import * as S from './style';
import { useRouter } from 'next/router';
import { useValueChanged } from '../../hooks';


const SearchForm = ({ mode, isOpend, toggleSearch }) => {

  const rotuer = useRouter();
  const [keyword, onChangekeyword, initalizeKeyword] = useValueChanged('');
  

  useEffect(() => {
    
    if(rotuer.query.keyword) {
      initalizeKeyword(`${rotuer.query.keyword}`);
    }
  
  }, [rotuer.query.keyword]);

  const moveSearchPosts = (e) => {
    
    if(e.keyCode === 13) {
      if(!keyword || !keyword.trim()) {
        return alert('내용을 기입해주세요.');
      }
      rotuer.push({
        pathname: `/search/${keyword}`, 
        query: {
          keyword: `${keyword}`,
        },
      });
    }

  };


  if(mode === 'PC') {
    return (
      <>
        <S.SearchFormMainContainer isOpend={isOpend}>
          <img className='searchButton' src='/search_button.svg' onClick={toggleSearch} alt='search_button.svg' />
          <S.SearchInput type='text' placeholder='검색어를 입력하세요' mode={mode} value={keyword} onChange={onChangekeyword} onKeyDown={moveSearchPosts} />
          <S.InitializeButton aria-label='searchValueInitializeButton' onClick={() => {initalizeKeyword('')}}>
            <img src='/search_form_initialize_button.svg' alt='search_form_initialize_button.svg' />
          </S.InitializeButton>
        </S.SearchFormMainContainer>
      </>
    );
  }else {
    return (
      <>
        <S.MobileSearchFormMainContainer isOpend={isOpend}>
          <S.SearchContainer>
            <img className='searchButton' src='/search_button.svg' onClick={toggleSearch} alt='search_button.svg' />
            <S.SearchInput type='text' placeholder='검색어를 입력하세요' mode={mode} value={keyword} onChange={onChangekeyword} onKeyDown={moveSearchPosts} />
            <S.InitializeButton aria-label='searchValueInitializeButton' onClick={() => {initalizeKeyword('')}}>
              <img src='/search_form_initialize_button.svg' alt='search_form_initialize_button.svg' />
            </S.InitializeButton>
          </S.SearchContainer>
        </S.MobileSearchFormMainContainer>
      </>
    );
  }

};


export default SearchForm;