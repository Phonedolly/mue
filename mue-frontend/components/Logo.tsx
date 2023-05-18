import { Pacifico } from "next/font/google";
import styled from "styled-components";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

const LogoWithoutLogic = styled.span<{ size: string }>`
  font-size: ${(props) => props.size};
  color: white;
`;

const Logo = ({ size = "medium" }) => {
  let _size: string;

  switch (size) {
    case "small":
      _size = "16px";
      break;
    case "medium":
      _size= "24px";
      break;
    case "large":
      _size = "36px";
      break;
    case "xlarge":
      _size = "48px";
    default:
      _size = "24px";
      break;
  }
  return <LogoWithoutLogic size={_size} className={pacifico.className}>M</LogoWithoutLogic>;
};

export default Logo;
