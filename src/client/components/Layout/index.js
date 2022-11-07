import React, { useRef, useState, useEffect } from 'react';
import * as S from './style';
import { useRouter } from 'next/router';
import { usePrevStateChanged } from '../../hooks';
import Globalstyle from '../GlobalStyles';
import Menubar from '../../containers/Menubar';
import SearchForm from '../SearchForm';


const Layout = ({ children }) => {

  const router = useRouter();
  const throttleRef = useRef(null);
  const [mobileMenuBar, setMobileMenuBar] = useState(false);
  const [mobileMenuBarAnimation, setMobileMenuBarAnimation] = useState(false);
  const [search, searchOnOff, setSearch] = usePrevStateChanged(false);
  const [scrollButton, setScrollButton] = useState(false);


  const showUpScrollButton = () => {
  
    if(throttleRef.current) {
      return;
    }
    throttleRef.current = setTimeout(() => {
      if(window.scrollY > 300) {
        setScrollButton(true);
      }else {
        setScrollButton(false);
      }
      clearTimeout(throttleRef.current);
      throttleRef.current = null;
    }, 500);

  };

  const toggleMobileMenuBar = () => {
    
    if(mobileMenuBar) {
      setMobileMenuBarAnimation(false);
      setTimeout(() => {
        setMobileMenuBar(false);
      }, 200);
    }else {
      setMobileMenuBarAnimation(true);
      setMobileMenuBar(true);
    }
    
  };
  
  useEffect(() => {

    window.addEventListener('scroll', showUpScrollButton);
    return () => {
      window.removeEventListener('scroll', showUpScrollButton);
    }

  }, []);

  useEffect(() => {

    if(mobileMenuBar) {
      toggleMobileMenuBar();
    }
    if(router.query.keyword) {
      setSearch(true);
    }

  }, [router.query]);
  
  const moveMain = () => {

    if(router.asPath === '/') {
      router.reload();
      window.scrollTo(0,0);
    }else {
      router.replace('/');
    }
    
  };
  
  const toggleMobileSearch = () => {

    if(!search) {
      window.scrollTo({
        top: 0, 
        left: 0, 
        behavior: "smooth"
      });
    }
    searchOnOff();

  };
  

  return (
    <>
      <Globalstyle />
      {mobileMenuBar && 
        <Menubar mode={'Mobile'} animation={mobileMenuBarAnimation} closeAction={toggleMobileMenuBar} />
      }
      <S.LayoutHeaderContainer>
        <S.HeaderLeft>
          <S.MobileMenuButton>
            <button aria-label='mobileMenuOnOffButton' onClick={toggleMobileMenuBar}>
              <img src='/layout_mobile_menu.svg' alt='layout_mobile_menu.svg' />
            </button>
          </S.MobileMenuButton>
          <S.LogoWrapper>
            <div className='mainLogo' onClick={moveMain}>
              <img src='/layout_main_logo.svg' alt='layout_main_logo.svg' /> 
            </div>     
          </S.LogoWrapper>
          <S.MobileSearchButtonContainer>
            <div>
              <button aria-label='mobileSearchOnOffButton' onClick={toggleMobileSearch}>
                <img className='searchButton' src={search ? '/search_cancel_button.svg' : '/search_button.svg'} alt={search ? 'search_cancel_button.svg' : '/search_button.svg'} />
              </button>
            </div>
          </S.MobileSearchButtonContainer>
        </S.HeaderLeft>
        <S.HeaderMiddle/>
        <S.HeaderRight>
          <S.SearchButtonContainer>
            <div className='searchButtonWrapper'>
              <button aria-label='searchOnOffButton' onClick={searchOnOff}>
                <img className='searchButton' src='/search_button.svg' alt='search_button.svg' />
              </button>
              <SearchForm mode={'PC'} isOpend={search} toggleSearch={searchOnOff} />
            </div>
          </S.SearchButtonContainer>
        </S.HeaderRight>
      </S.LayoutHeaderContainer>
      <SearchForm mode={'Mobile'} isOpend={search} toggleSearch={searchOnOff} />
      <S.LayoutContentsContainer>
        <S.LeftContents>
          <div className='menuBarWrapper'>
            <Menubar mode={'PC'} animation={null} closeAction={toggleMobileMenuBar} />
          </div>     
        </S.LeftContents>
        <S.MiddleContents>
          {children}
        </S.MiddleContents>
        <S.RightContents>
        </S.RightContents>
        <S.ScrollTopButton aria-label='scrollTopButton' onClick={() => {window.scrollTo({top: 0, left: 0, behavior: "smooth"})}} showUp={scrollButton}>
          <img src='/layout_move_scroll_top_button.svg' alt='layout_move_scroll_top_button.svg' />
        </S.ScrollTopButton>
      </S.LayoutContentsContainer>
    </>
  );

};


export default Layout;