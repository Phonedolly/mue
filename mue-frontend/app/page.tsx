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
