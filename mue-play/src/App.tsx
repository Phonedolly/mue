import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";

import TitleBar from "./components/TitleBar";
import Container from "./components/Container";
import { AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import InnerContainer from "./components/InnerContainer";
import Bulb from "./components/Bulb";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [globallyOn, setGloballyOn] = useState(false);

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <Container>
      <TitleBar />
      <InnerContainer>
        <NavBar />
        <AnimatePresence>
          <Bulb globallyOn={globallyOn} />
        </AnimatePresence>
      </InnerContainer>
    </Container>
  );
}

export default App;
