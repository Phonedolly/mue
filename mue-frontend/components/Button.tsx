import { motion } from "framer-motion";
import { FC } from "react";
import { styled } from "styled-components";
import { ButtonProps } from "../types/props";
import Link from "next/link";

const ButtonWithoutLogic = styled(motion.div)<{
  size: { objectSize: string; padding: string };
  fontWeight: "normal" | "bold" | "italic";
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: space-around; */
  column-gap: 0.3em;
  font-family: inherit;
  font-size: ${(props) => props.size.objectSize};
  font-weight: ${(props) => props.fontWeight};
  background-color: #303030;
  color: white;
  border: none;
  border-radius: 13px;
  cursor: pointer;
  padding: ${(props) => props.size.padding};
`;

const Button: FC<ButtonProps> = (props) => {
  const buttonSizes = {
    small: { objectSize: "0.7em", padding: "0.25em 0.3em" },
    medium: { objectSize: "1.2em", padding: "0.7em 0.9em" },
    large: { objectSize: "2em", padding: "1.5em" },
    xlarge: { objectSize: "3em", padding: "2em" },
  };

  let buttonSize;
  let fontWeight: "normal" | "bold" | "italic" = "normal";
  if (props?.size !== undefined) {
    buttonSize = buttonSizes[props.size];
  } else {
    buttonSize = buttonSizes.medium;
  }

  if (props?.fontWeight !== undefined) {
    fontWeight = props.fontWeight;
  }
  if (props?.isLink && props.href !== undefined) {
    return (
      <Link href={props.href}>
        <ButtonWithoutLogic
          whileHover={{ scale: 1.07, transition: { duration: 0.15 } }}
          whileTap={{ scale: 1.0 }}
          {...props}
          size={buttonSize}
          fontWeight={fontWeight}
        >
          {props.icon !== undefined ? props.icon : null}
          {props.children}
        </ButtonWithoutLogic>
      </Link>
    );
  }
  return (
    <ButtonWithoutLogic
      whileHover={{ scale: 1.07, transition: { duration: 0.15 } }}
      whileTap={{ scale: 1.0 }}
      {...props}
      size={buttonSize}
      fontWeight={fontWeight}
    >
      {props.icon !== undefined ? props.icon : null}
      {props.children}
    </ButtonWithoutLogic>
  );
};

export default Button;
