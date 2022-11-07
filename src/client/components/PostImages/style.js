import styled from 'styled-components';


export const PostImagesMainContainer = styled.div`
  
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  background-color: #20232A;
  margin-top: 16px;

`;

export const PostImage = styled.div`

  position: relative;
  width: 70%;
  margin-bottom: 10px;
  padding-bottom: 40%;
  object-fit: cover;

  & img {
    position: absolute;
    width: 100%;
    height: 100%;
  };

`;

