// global.ts
import { createGlobalStyle } from "styled-components";
import OutfitBold from "./fonts/Outfit-Bold.woff2";
import OutfitRegular from "./fonts/Outfit-Regular.woff2";

const GlobalStyle = createGlobalStyle`
  @font-face {
        font-family: 'OutfitBold';
        src: local('OutfitBold'), local('OutfitBold');
        font-style: normal;
        src: url(${OutfitBold}) format('truetype');
  }
  @font-face {
        font-family: 'OutfitRegular';
        src: local('OutfitRegular'), local('OutfitRegular');
        font-style: normal;
        src: url(${OutfitRegular}) format('truetype');
  }

  background-color: transparent;
`;

export default GlobalStyle;
