import { createGlobalStyle } from "styled-components"


const Globalstyle = createGlobalStyle`

  html {
    width: 100%;
    height: 100%;
  };
  
  body {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #000000;
    margin: 0 auto;
  };

  input, textarea, button {
    appearance: none;
    -moz-appearance: none;
    -webkit-appearance: none;
    border-radius: 0;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
  };

`;


export default Globalstyle;