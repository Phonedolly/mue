import { FC } from "react";
import styled from "styled-components";
import { appWindow } from "@tauri-apps/api/window";
import { TitleBarButtonProps } from "../types/props";

const TitleBarWithoutLogic = styled.div`
  height: 32px;
  background: #329ea300;
  user-select: none;
  display: flex;
  justify-content: flex-end;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const TitleBarButtonWithoutImage = styled.div<TitleBarButtonProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 32px;
  &:hover {
    background-color: ${(props: TitleBarButtonProps) =>
      props.isCloseButton ? "red" : "#DDDDDDF0"};
    transition:  background-color 0.2s;
  }
  transition: background-color 0.2s;
`;

const TitleBarMinimizeButton: FC = () => (
  <TitleBarButtonWithoutImage onClick={() => appWindow.minimize()}>
    <img
      src="https://api.iconify.design/mdi:window-minimize.svg"
      alt="minimize"
    />
  </TitleBarButtonWithoutImage>
);

const TitleBarMaximizeButton: FC = () => (
  <TitleBarButtonWithoutImage onClick={() => appWindow.maximize()}>
    <img
      src="https://api.iconify.design/mdi:window-maximize.svg"
      alt="maximize"
    />
  </TitleBarButtonWithoutImage>
);

const TitleBarCloseButton: FC = () => (
  <TitleBarButtonWithoutImage
    onClick={() => appWindow.close()}
    isCloseButton
  >
    <img src="https://api.iconify.design/mdi:window-close.svg" alt="close" />
  </TitleBarButtonWithoutImage>
);

const TitleBar: FC = () => (
  <TitleBarWithoutLogic data-tauri-drag-region>
    <TitleBarMinimizeButton />
    {/* <TitleBarMaximizeButton /> */}
    <TitleBarCloseButton />
  </TitleBarWithoutLogic>
);

export default TitleBar;
