import { TargetAndTransition, VariantLabels } from "framer-motion";

export interface ButtonProps {
  children: string;
  onClick?: (e: React.SyntheticEvent) => void;
  whileHover?: TargetAndTransition | VariantLabels | undefined;
  whileTap?: TargetAndTransition | VariantLabels | undefined;
  disabled?: boolean;
}

export interface TitleBarButtonProps {
  isCloseButton?: boolean;
}

export interface NavBarProps {
  numOfItems: number;
}
