import styled from "styled-components";


export const ProfilePicture = styled.div`

  width: ${(props) => {
    return props.avatarSize === 'big' ? '58px;' : '48px'
  }};
  height: ${(props) => {
    return props.avatarSize === 'big' ? '58px;' : '48px'
  }};
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 50%;
  background-color: #FFFFFF;
  object-fit: cover;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  };

`;

export const DefaultProfilePicture = styled.div`

  width: ${(props) => {
    return props.avatarSize === 'big' ? '58px;' : '48px'
  }};
  height: ${(props) => {
    return props.avatarSize === 'big' ? '58px;' : '48px'
  }};
  border-radius: 50%;
  box-sizing: border-box;
  background-color: #808080;
  overflow: hidden;
  object-fit: cover;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  };

`;

