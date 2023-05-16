import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";

import TitleBar from "./components/TitleBar";
import Container from "./components/Container";
import { AnimatePresence } from "framer-motion";
import { BulbOff, BulbOn } from "./components/Bulb";
import GlobalLightState from "./components/GlobalLightState";

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
      <AnimatePresence>
        {globallyOn === true ? (
          <>
            <BulbOn />
            <GlobalLightState>All Light is On</GlobalLightState>
          </>
        ) : (
          <>
            <BulbOff />
            <GlobalLightState>All Light is Off</GlobalLightState>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
}

export default App;
