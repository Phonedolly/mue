"use client";

import Button from "@/components/Button";
import InnerContainer from "@/components/InnerContainer";
import BulbIcon from "@/components/icons/BulbIcon";
import EditIcon from "@/components/icons/EditIcon";
import MonitorIcon from "@/components/icons/Monitor";
import StripIcon from "@/components/icons/StripIcon";
import { IDevice } from "@/types/types";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { v4 } from "uuid";
import Wheel from "@uiw/react-color-wheel";
import {
  HsvaColor,
  hsvaToRgbString,
  hsvaToRgbaString,
  rgbaToHsva,
} from "@uiw/color-convert";

const DeviceModalBackground = styled(motion.div)`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

const DeviceModalWithoutLogic = styled(motion.div)`
  display: flex;
  flex-direction: column;
  /* row-gap: 1.5rem; */
  align-items: center;
  justify-content: space-between;
  margin: 1rem auto;
  padding: 1.5rem 0rem 1.5rem 2.2rem;
  /* height: 22rem; */
  max-height: 75vh;
  width: 32rem;
  max-width: 80vw;
  border-radius: 25px;
  background-color: rgb(60, 60, 60);
  box-shadow: 0px 5px 50px rgba(0, 0, 0, 0.5);
  overflow-y: scroll;
  &::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 2.2rem;
    color: rgba(0, 0, 0, 0.5);
  }
  &::-webkit-scrollbar-thumb {
    /* width: 50%; */
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 25px;
    overflow: hidden;
    border: 0.65rem solid transparent;
    background-clip: padding-box;
  }
`;

const DeviceModalTitleAndEdit = styled.div`
  position: relative;
  left: 1.3rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const DeviceModalTitle = styled.h1`
  font-size: 2.3rem;
  color: white;
`;

const DeviceModalColorPickerAndBrightnessWithoutLogic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 2.5rem;
  width: 100%;
`;

function makePercentage(value: number, max: number) {
  const percentage = `${String(Math.round((value / max) * 100))}%`;
  return percentage;
}
const BrightnessSliderWithoutLogic = styled.input<{ value: number }>`
  appearance: none;
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 2em;
    height: 4em;
    cursor: -webkit-grab;
  }

  background-color: transparent;
  accent-color: #f5f5f5;
  height: 4rem;
  width: 80%;
  max-width: 70vw;
  border-radius: 30px;
  cursor: pointer;
  background-image: linear-gradient(
    to right,
    #fbf8c1 0%,
    #fbf8c1 ${(props) => makePercentage(props.value, 100)},
    #505050 ${(props) => makePercentage(props.value, 100)},
    #505050 100%
  );
`;

const BrightnessSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const BrightnessSlider = (props: {
  value: number;
  setBrightness: (newVal: number) => void;
}) => {
  return (
    <BrightnessSliderContainer>
      <BrightnessSliderWithoutLogic
        type="range"
        min="0"
        max="100"
        value={props.value}
        onChange={(e) => props.setBrightness(Number(e.target.value))}
      />
      <DeviceModalBrightness>{`${props.value}%`}</DeviceModalBrightness>
    </BrightnessSliderContainer>
  );
};
const DeviceModalBrightness = styled.h1`
  font-size: 1rem;
  font-weight: bold;
  color: white;
  width: 3em;
  text-align: center;
`;
const DeviceModalColorPickerAndBrightness = (props: {
  initialColor: HsvaColor;
  initialBrightness: number;
  setCurColor: (curColor: HsvaColor) => void;
}) => {
  const [hsva, setHsva] = useState(props.initialColor);
  const [brightness, setBrightness] = useState(props.initialBrightness);
  return (
    <DeviceModalColorPickerAndBrightnessWithoutLogic>
      <Wheel
        color={hsva}
        onChange={(color) => {
          setHsva({ ...hsva, ...color.hsva });
          props.setCurColor({ ...hsva, ...color.hsva });
        }}
        width={250}
        height={250}
      />
      <BrightnessSlider value={brightness} setBrightness={setBrightness} />
    </DeviceModalColorPickerAndBrightnessWithoutLogic>
  );
};

const DeviceModalInfoTable = styled.table`
  border: none;
  width: 100%;
  color: rgb(200, 200, 200);
  text-align: center;
  font-size: 1.35rem;
  padding: 2rem 0.2rem;
`;

const DeviceModalInfoTableTitle = styled.td`
  color: white;
  font-weight: bold;
  width: 50%;
`;

const DeviceModalInfoTableValue = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 0.5em;
  align-items: center;
  justify-content: center;
  width: 12em;
`;

const DeviceModalCurrentColor = styled.span<{ color: string }>`
  background-color: ${(props) => props.color};
  border-radius: 8px;
  width: 1.8rem;
  height: 1.8rem;
`;

const DeviceModal = (props: {
  device: IDevice;
  setShowModal: (newVal: boolean) => void;
  icon: JSX.Element;
}) => {
  const [curColor, setCurColor] = useState<HsvaColor>(
    rgbaToHsva({
      r: props.device.status.color.red,
      g: props.device.status.color.green,
      b: props.device.status.color.blue,
      a: 1,
    })
  );

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <DeviceModalWithoutLogic
      initial={{ opacity: 0.5, y: "30vh" }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: "30vh" }}
    >
      <DeviceModalTitleAndEdit>
        <DeviceModalTitle>{props.device.alias}</DeviceModalTitle>
        <Button icon={<EditIcon />} $backgroundColor="transparent" />
      </DeviceModalTitleAndEdit>
      {/* {props.icon} */}
      <DeviceModalColorPickerAndBrightness
        initialColor={curColor}
        initialBrightness={props.device.status.brightness}
        setCurColor={setCurColor}
      />
      <DeviceModalInfoTable>
        <tbody>
          {[
            ["Name", props.device.alias],
            ["Color", `${hsvaToRgbString(curColor).replace("a", "")}`],
            ["Brightness", `${props.device.status.brightness}%`],
            [
              "Type",
              props.device.type[0].toUpperCase() + props.device.type.slice(1),
            ],
            [
              "Status",
              props.device.status.isConnected
                ? "Connected"
                : props.device.status.isConnecting
                ? "Connecting"
                : "Disconnected",
            ],
            ["IP", props.device.status.ip],
          ].map((item) => (
            <tr key={v4()} style={{ height: "2.7rem" }}>
              <DeviceModalInfoTableTitle>{item[0]}</DeviceModalInfoTableTitle>
              <td style={{ width: "50%" }}>
                <DeviceModalInfoTableValue>
                  {item[0] === "Color" ? (
                    <DeviceModalCurrentColor color={item[1]} />
                  ) : null}
                  {item[1]}
                </DeviceModalInfoTableValue>
              </td>
            </tr>
          ))}
        </tbody>
      </DeviceModalInfoTable>
      <Button
        size="medium"
        onClick={() => {
          console.log(`close`);
          props.setShowModal(false);
        }}
      >
        Close
      </Button>
    </DeviceModalWithoutLogic>
  );
};

const DevicesContainer = styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
  row-gap: 3rem;
  column-gap: 3rem;
  grid-template-columns: 1fr;
  @media (min-width: 1280px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DeviceWithoutLogic = styled(motion.div)<{ $backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props?.$backgroundColor ? props.$backgroundColor : "rgb(50, 50, 50)"};
  width: 90%;
  max-width: 22rem;
  cursor: pointer;
  border-radius: 25px;
  padding: 2rem 1rem;
  transition: background-color 0.3s ease-in-out;
`;

const DeviceType = styled.h1<{ $isOn: boolean }>`
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  background-color: ${(props) =>
    props.$isOn ? "rgba(68, 68, 68, 0.5)" : "rgba(34,34,34, 0.4)"};
  color: rgb(220, 220, 220);
  border-radius: 13px;
  padding: 0.55rem;
  margin: 0;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.01);
  transition: background-color 0.175s ease-in-out, color 0.175s ease-in-out;
`;

const OnOffSwitchIndicator = styled(motion.div)<{ $on: boolean }>`
  position: absolute;
  top: 0px;
  left: ${(props) => (props.$on ? "50%" : "0%")};
  width: 50%;
  height: 100%;
  border-radius: 9999px;
  background-color: ${(props) =>
    props.$on ? "rgb(72, 232, 67)" : "rgb(50, 50, 50)"};
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  transition: left 0.175s ease-in-out, background-color 0.175s ease-in-out;
`;
const OnOffSwitchWithoutLogic = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  width: 2rem;
  height: 1rem;
  background-color: rgb(68, 68, 68);
  border: none;
  border-radius: 9999px;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 0.55rem 1rem;
`;

const TypeAndSwitch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const DeviceName = styled.h1`
  font-size: 2.3rem;
  color: white;
  margin: 0.35rem auto;
`;

const DeviceStatus = styled.h2<{ color: string }>`
  font-size: 1.5rem;
  color: ${(props) => props.color};
  margin: 0.35rem auto;
  background-color: rgba(68, 68, 68, 0.25);
  padding: 0.2em 0.5em;
  border-radius: 13px;
`;

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.2rem;
`;

const OnOffSwitch = (props: {
  isOn: boolean;
  setDevice: (func: (prev: IDevice) => IDevice) => void;
  curID: string;
}) => {
  return (
    <OnOffSwitchWithoutLogic
      onClick={(e) => {
        e.stopPropagation();
        props.setDevice((prev) => {
          return {
            ...prev,
            status: {
              ...prev.status,
              isOn: !prev.status.isOn,
            },
          };
        });
      }}
    >
      <OnOffSwitchIndicator $on={props.isOn} />
    </OnOffSwitchWithoutLogic>
  );
};

const Device = (props: {
  device: IDevice;
  setDevices: (func: (prev: IDevice[]) => IDevice[]) => void;
  // setWhichDeviceSelected: (newVal: string) => void;
  // setShowModal: (newVal: boolean) => void;
}) => {
  const [device, setDevice] = useState<IDevice>(props.device);
  const [on, setOn] = useState<boolean>(device.status.isOn);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    function listenEscapeKeyPress(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    }
    if (showModal === true) {
      document.addEventListener("keydown", listenEscapeKeyPress);
      // document.body.style.setProperty("overflow", "hidden");
      // document.body.style.setProperty("overflow", "none");
    } else {
      document.removeEventListener("keydown", listenEscapeKeyPress);
      // document.body.style.setProperty("overflow", scrollInfo.overflow);
      // document.body.style.setProperty("touch-action", scrollInfo.touchAction);
    }
  }, [showModal]);

  let icon;
  let connectStatus: string = "Device is Offline";
  let connectStatusColor: string = "#c9c9c9";
  switch (props.device.type) {
    case "bulb":
      icon = <BulbIcon size="12rem" on={device.status.isOn} masxize="40vw" />;
      break;
    case "play":
      icon = (
        <MonitorIcon size="12rem" on={device.status.isOn} masxize="40vw" />
      );
      break;
    case "strip":
      icon = <StripIcon size="12rem" on={device.status.isOn} masxize="40vw" />;
      break;
  }
  if (device.status.isConnected) {
    connectStatus = "Connected";
    connectStatusColor = "#b3fd3d";
  } else if (device.status.isConnecting) {
    connectStatus = "Connecting...";
    connectStatusColor = "#f1f1f1";
  } else if (
    device.status.isConnected === false &&
    device.status.isConnecting === false
  ) {
    connectStatus = "Device is Offline";
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <AnimatePresence>
        {showModal === true ? (
          <DeviceModalBackground
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.2 } }}
          >
            <DeviceModal
              device={device}
              setShowModal={setShowModal}
              icon={icon}
            />
          </DeviceModalBackground>
        ) : null}
      </AnimatePresence>
      <DeviceWithoutLogic
        initial={{ y: "15em", opacity: 0 }}
        animate={{ y: "0em", opacity: 1 }}
        whileHover={{ scale: 1.03 }}
        onClick={() => {
          setShowModal(true);
        }}
        $backgroundColor={`rgba(${device.status.color.red}, ${
          device.status.color.green
        }, ${device.status.color.blue}, ${device.status.isOn ? 0.65 : 0.2})`}
      >
        <TypeAndSwitch>
          <DeviceType $isOn={device.status.isOn}>
            {device.type[0].toUpperCase() + device.type.slice(1)}
          </DeviceType>
          <OnOffSwitch
            isOn={device.status.isOn}
            curID={device.id}
            setDevice={setDevice}
          />
        </TypeAndSwitch>
        {icon}
        <InformationContainer>
          <DeviceName>{device.alias}</DeviceName>
          <DeviceStatus color={connectStatusColor}>
            {connectStatus}
          </DeviceStatus>
        </InformationContainer>
      </DeviceWithoutLogic>
    </div>
  );
};

export default function Devices() {
  const [initDevicesStatus, setInitDevicesStatus] = useState<IDevice[]>([
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
        color: { red: 255, green: 255, blue: 0 },
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
        color: { red: 255, green: 100, blue: 255 },
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
        color: { red: 195, green: 255, blue: 255 },
        ip: "192.168.0.114",
        isConnected: false,
        isConnecting: true,
      },
    },
  ]);

  return (
    <InnerContainer>
      <DevicesContainer>
        <AnimatePresence>
          {initDevicesStatus.map((device) => (
            <Device
              key={v4()}
              device={device}
              setDevices={setInitDevicesStatus}
              // setWhichDeviceSelected={setWhichDeviceSelected}
              // setShowModal={setShowModal}
            />
          ))}
        </AnimatePresence>
      </DevicesContainer>
    </InnerContainer>
  );
}
