'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Container from "@/components/Container";
import { useState } from "react";
import InnerContainer from "@/components/InnerContainer";
import Bulb from "@/components/Bulb";

export default function Home() {
  const [globallyOn, setGloballyOn] = useState(false);

  return (
      <InnerContainer>
        <Bulb globallyOn={globallyOn}/>
      </InnerContainer>

  );
}
