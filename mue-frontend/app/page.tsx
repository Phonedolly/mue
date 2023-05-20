"use client";

import { useState } from "react";
import InnerContainer from "@/components/InnerContainer";
import Bulb from "@/components/Bulb";
import styled from "styled-components";
import Button from "@/components/Button";
import BulbIcon from "@/components/icons/BulbIcon";
import SettingsIcon from "@/components/icons/SettingsIcon";
import { v4 } from "uuid";
import Link from "next/link";
import { IDevice } from "@/types/types";

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  padding: 1rem;
`;

export default function Home() {
  const [globallyOn, setGloballyOn] = useState(false);

  const devices: IDevice[] = [
    {
      id: v4(),
      alias: "Strip1",
      type: "strip",
      status: {
        brightness: 50,
        isOn: true,
        color: { red: 255, green: 255, blue: 255 },
        ip: "192.168.0.110",
        isConnected: true,
        isConnecting: false,
      },
    },
    {
      id: v4(),
      alias: "Bulb1",
      type: "bulb",
      status: {
        brightness: 50,
        isOn: true,
        color: { red: 255, green: 255, blue: 255 },
        ip: "192.168.0.112",
        isConnected: true,
        isConnecting: false,
      },
    },
    {
      id: v4(),
      alias: "Mue Play",
      type: "play",
      status: {
        brightness: 50,
        isOn: true,
        color: { red: 255, green: 255, blue: 255 },
        ip: "192.168.0.113",
        isConnected: true,
        isConnecting: false,
      },
    },
    {
      id: v4(),
      alias: "test",
      type: "strip",
      status: {
        brightness: 50,
        isOn: true,
        color: { red: 255, green: 255, blue: 255 },
        ip: "192.168.0.114",
        isConnected: false,
        isConnecting: false,
      },
    },
    {
      id: v4(),
      alias: "test",
      type: "strip",
      status: {
        brightness: 50,
        isOn: true,
        color: { red: 255, green: 255, blue: 255 },
        ip: "192.168.0.114",
        isConnected: false,
        isConnecting: true,
      },
    },
  ];

  return (
    <InnerContainer
      initial={{ y: "15em", opacity: 0 }}
      animate={{ y: "0em", opacity: 1 }}
    >
      <Bulb globallyOn={globallyOn} />
      <ButtonContainer>
        <Button icon={<BulbIcon />} isLink href="/devices">
          Devices
        </Button>
        <Button icon={<SettingsIcon />}>Settings</Button>
      </ButtonContainer>
    </InnerContainer>
  );
}
