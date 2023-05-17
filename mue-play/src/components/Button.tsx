import { motion } from "framer-motion";
import { FC } from "react";
import { styled } from "styled-components";
import { ButtonProps } from "../types/props";

const ButtonWithoutLogic = styled(motion.button)`
  background-color: red;
`;

const Button: FC<ButtonProps> = (props) => {
  return <ButtonWithoutLogic {...props}>{props.children}</ButtonWithoutLogic>;
};

export default Button;
