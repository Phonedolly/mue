"use client";

import Button from "@/components/Button";
import DeviceConfig from "@/components/DeviceConfig";
import InnerContainer from "@/components/InnerContainer";
import BulbIcon from "@/components/icons/BulbIcon";
import EditIcon from "@/components/icons/EditIcon";
import MonitorIcon from "@/components/icons/Monitor";
import StripIcon from "@/components/icons/StripIcon";
import { IDevice } from "@/types/types";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import { styled } from "styled-components";
import { v4 } from "uuid";

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
  row-gap: 1.5rem;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  max-height: 80vh;
  width: 32rem;
  max-width: 80vw;
  border-radius: 25px;
  background-color: rgb(60, 60, 60);
  box-shadow: 0px 5px 50px rgba(0, 0, 0, 0.5);
`;

const DeviceModalTitleAndEdit = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const DeviceModalTitle = styled.h1`
  font-size: 2.3rem;
  color: white;
`;

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
`;

const DeviceModal = (props: {
  device: IDevice;
  setShowModal: (newVal: boolean) => void;
  icon: JSX.Element;
}) => {
  return (
    <DeviceModalWithoutLogic
      initial={{ opacity: 0.5, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 200 }}
    >
      <DeviceModalTitleAndEdit>
        <DeviceModalTitle>{props.device.alias}</DeviceModalTitle>
        <Button icon={<EditIcon />} backgroundColor="transparent" />
      </DeviceModalTitleAndEdit>
      {props.icon}
      <DeviceModalInfoTable>
        {[
          ["Name", props.device.alias],
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
          ["Brightness", `${props.device.status.brightness}%`],
          [
            "Color",
            `rgb(${props.device.status.color.red}, ${props.device.status.color.green}, ${props.device.status.color.blue})`,
          ],
          ["IP", props.device.status.ip],
        ].map((item) => (
          <tr key={v4()} style={{ height: "2.7rem" }}>
            <DeviceModalInfoTableTitle>{item[0]}</DeviceModalInfoTableTitle>
            <td>{item[1]}</td>
          </tr>
        ))}
      </DeviceModalInfoTable>
      <Button size="medium" onClick={() => props.setShowModal(false)}>
        Close
      </Button>
    </DeviceModalWithoutLogic>
  );
};

const DevicesContainer = styled.div`
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
  row-gap: 3rem;
`;

const DeviceWithoutLogic = styled(motion.div)<{ $backgroundColor?: string }>`
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props?.$backgroundColor ? props.$backgroundColor : "rgb(50, 50, 50)"};
  width: 24rem;
  max-width: 80%;
  cursor: pointer;
  border-radius: 25px;
  padding: 2rem 1rem;
  transition: background-color 0.175s ease-in-out;
`;

const DeviceType = styled.h1<{ isOn: boolean }>`
  display: flex;
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  background-color: ${(props) =>
    props.isOn ? "rgba(68, 68, 68, 0.7)" : "rgba(34,34,34, 0.4)"};
  color: rgb(180, 180, 180);
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
  font-size: 2rem;
  color: ${(props) => props.color};
  margin: 0.35rem auto;
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
  const [scope, animate] = useAnimate();

  useEffect(() => {
    function listenEscapeKeyPress(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setShowModal(false);
      }
    }
    if (showModal === true) {
      document.addEventListener("keydown", listenEscapeKeyPress);
    } else {
      document.removeEventListener("keydown", listenEscapeKeyPress);
    }
  }, [showModal]);

  let icon;
  let connectStatus: string = "Device is Offline";
  let connectStatusColor: string = "#bc0303";
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
      icon = (
        <StripIcon size="12rem" on={props.device.status.isOn} masxize="40vw" />
      );
      break;
  }
  if (device.status.isConnected) {
    connectStatus = "Connected";
    connectStatusColor = "#a3e635";
  } else if (device.status.isConnecting) {
    connectStatus = "Connecting";
    connectStatusColor = "#999999";
  } else if (
    device.status.isConnected === false &&
    device.status.isConnecting === false
  ) {
    connectStatus = "Device is Offline";
    connectStatusColor = "#e90202";
  }

  return (
    <>
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
        }, ${device.status.color.blue}, ${device.status.isOn ? 0.45 : 0.2})`}
        // onClick={() => {
        //   props.setWhichDeviceSelected(props.device.id);
        //   props.setShowModal(true);
        // }}
      >
        <TypeAndSwitch>
          <DeviceType isOn={device.status.isOn}>
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
    </>
  );
};

export default function Devices() {
  // const [showModal, setShowModal] = useState<boolean>(false);
  // const [whichDeviceSelected, setWhichDeviceSelected] = useState<string>("");
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
