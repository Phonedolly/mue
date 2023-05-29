// global.ts
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  :root, body{
    background-color: #000000;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 2.2rem;
  }
  &::-webkit-scrollbar-thumb {
    /* width: 50%; */
    background-color: rgba(100,100,100,0.5);
    border-radius: 25px;
    overflow: hidden;
    border: 0.65rem solid transparent;
    background-clip: padding-box;
  }
`;

export default GlobalStyle;
