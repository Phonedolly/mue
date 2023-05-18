import { styled } from "styled-components";

const IconWithoutLogic = styled.span<{
  size: string;
  maxSize?: string;
  backgroundimage: string;
  on: boolean | undefined;
}>`
  height: ${(props) => props.size};
  width: ${(props) => props.size};
  max-width: ${(props) =>
    props?.maxSize !== undefined ? props.maxSize : "none"};
  background-position: center;
  background-repeat: no-repeat;
  /* margin: 0.17rem; */
  background-image: ${(props) => props.backgroundimage};
  filter: drop-shadow(3px 5px 30px rgb(255, 255, 133, 0.9));
`;

const Icon = (props: {
  size?: "small" | "medium" | "large" | "xlarge" | string;
  maxSize?: string;
  backgroundimage: string;
  on: boolean | undefined;
}) => {
  const sizes = {
    small: "0.7em",
    medium: "1.2em",
    large: "2em",
    xlarge: "3.0em",
  };
  let size;
  if (props.size !== undefined && typeof props.size !== "string") {
    size = sizes[props.size];
  } else if (typeof props.size === "string") {
    size = props.size;
  } else {
    size = sizes.medium;
  }
  return (
    <IconWithoutLogic
      size={size}
      backgroundimage={props.backgroundimage}
      on={props.on}
      maxSize={props.maxSize}
    />
  );
};

export default Icon;
