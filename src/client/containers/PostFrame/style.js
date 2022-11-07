import styled, { keyframes, css } from 'styled-components';


export const PostFrameMainContainer = styled.div`

  display: flex;
  flex-direction: column;
  width: 90%;
  overflow: hidden;
  background-color: #20232A;
  margin-top: 6px;
  font-family: 'Noto Sans KR', sans-serif;

  @media all and (max-width: 1024px) {
    width: 100%;
  };

`;

export const Header = styled.div`

  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 3;
  width: 100%;
  height: 50px;
  background-color: #20232A;
  color: #FFFFFF;
 
  & button {
    border: none;
    background: none;
    margin-right: 3%;
    padding-right: 2%;
    cursor: pointer;

    & img {
      width: 20px;
      height: 5px;
    };
  };
 
`;

export const UtillMenuWrapper = styled.div`

  display: flex;
  justify-content: flex-end;
  position: relative;
  width: 100%;

`;

export const Contents = styled.div`

  display: flex;
  width: 100%;
  background-color: #20232A;
  color: #FFFFFF;
  
`;

export const AvatarWrapper = styled.div`
 
  display: flex;
  justify-content: flex-end;
  margin-right: 14px;
  margin-bottom: 4px;
  margin-left: 4%;
  cursor: pointer;

`;

export const PostContents = styled.div`

  display: flex;
  flex-direction: column;
  width: 70%;
  
  & .content {
    width: 100%;
    margin-top: 8px;
    font-family: 'Noto Sans KR', sans-serif;
    font-weight: 300;
    font-size: 0.8rem;
    color: #FFFFFF;
    
    & p {
      margin: 0;
    };
  };

`;

export const UserInformation = styled.div`
  
  display: flex;
  font-weight: 500;
  
  & div {
    display: inline;
  };

  & .nickname {
    font-size: 0.9rem;

    & a {
      color: #FFFFFF;
      text-decoration: none;
    };

    & p {
      margin: 0;
    };
  };
  
  & .creationDate {
    margin-left: 6px;
    font-size: 0.9rem;
    color: #A9A9A9;
  };

`;

export const Footer = styled.div`

  display: flex;
  justify-content: center;
  width: 100%;
  height: ${(props) => {
    return props.hasImage === true ? '46px' : '44px'
  }};
  overflow: hidden;
  background-color: #20232A;
  font-weight: 300;
  font-size: 0.6rem;
  color: #FFFFFF;
 
`;

export const Actions = styled.div`

  display: flex;
  justify-content: center;
  width: 50%;
  
  & .emptyBox {
    width: 80px;
  };

  & .actionContainer {
    display: flex;
    height: 30px;
    margin: 4px 10px 0px 20px;
  };

  & img {
    width: 21.11px;
    height: 15.719px;
    margin-top: 6px;
    vertical-align: baseline;
  };

  & button {
    border: none;
    background: none;
    cursor: pointer;
    margin-right: 6px;
    padding: 0;
  };

  & p {
    font-weight: 500;
  };

  & .comment {
    width: 21.11px;
    height: 15.719px;
    box-sizing: content-box;
    margin-top: 2px;
    background-image: url('/post_frame_comment_button.svg');
    background-repeat: no-repeat;
    background-size: auto;
    transition: background-image 0.3s ease-in-out;
    vertical-align: middle;

    :hover {
      background-image: url('/post_frame_toggle_comment_button.svg');
    };
  };

  & .commentLength {
    margin: 8px 0px 0px 4px;
  };

  & .like {
    width: 21.11px;
    height: 15.719px;
    box-sizing: content-box;
    background-image: url('/post_frame_like_button.svg');
    background-repeat: no-repeat;
    background-size: auto;
    margin-top: 2px;
    transition: background-image 0.3s ease-in-out;
    vertical-align: middle;

    :hover {
      background-image: url('/post_frame_toggle_like_button.svg');
    };
  };

  & .likedLength {
    margin: 8px 0px 0px 0px;
  };

`;

const listWrapperDownAnimation = keyframes`

  from {
    max-height: 0px;
  };

  to {
    max-height: 1000px;
  };

`;

const listWrapperUpAnimation = (maxHeight) => keyframes`

  from {
    max-height: ${maxHeight};
  };

  to {
    max-height: 0px;
  };

`;

export const CommentListWrapper = styled.div`

  display: flex;
  position: relative;
  width: 100%;
  max-height: ${(props) => {
    return props.animation ? '4000px' :' 0px'
  }};
  overflow: hidden;
  animation: ${(props) => {
    return props.animation ? css`${listWrapperDownAnimation} ease-in 1.5s` : css`${listWrapperUpAnimation(props.maxHeight)} ease-in 1s`
  }};

`;

