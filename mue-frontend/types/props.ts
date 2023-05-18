import { TargetAndTransition, VariantLabels } from "framer-motion";
import { WebTarget } from "styled-components";

export interface ButtonProps {
  children: string;
  icon?: JSX.Element;
  size?: "small" | "medium" | "large" | "xlarge";
  fontWeight?: "normal" | "bold" | "italic";
  onClick?: (e: React.SyntheticEvent) => void;
  whileHover?: TargetAndTransition | VariantLabels | undefined;
  whileTap?: TargetAndTransition | VariantLabels | undefined;
  disabled?: boolean;
  isLink?: boolean;
  href?: string;
}

export interface TitleBarButtonProps {
  isCloseButton?: boolean;
}

export interface NavBarProps {
  navOpen: boolean;
  setNavOpen: (value: boolean) => void;
}
