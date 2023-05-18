"use client";

import InnerContainer from "@/components/InnerContainer";
import BulbIcon from "@/components/icons/BulbIcon";
import MonitorIcon from "@/components/icons/Monitor";
import StripIcon from "@/components/icons/StripIcon";
import { IDevice } from "@/types/types";
import { AnimatePresence, motion } from "framer-motion";
import { styled } from "styled-components";
import { v4 } from "uuid";

const DevicesContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 4rem;
`;

const DeviceWithoutLogic = styled(motion.div)`
  display: flex;
  flex-direction: column;
  row-gap: 4vw;
  align-items: center;
  justify-content: center;
  background-color: rgb(50, 50, 50);
  width: 24rem;
  max-width: 80vw;
  cursor: pointer;
  border-radius: 13px;
  padding: 2rem 1rem;
`;

const DeviceTypeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  align-items: center;
`;

const DeviceType = styled.h1`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.1rem;
  background-color: rgb(68, 68, 68);
  color: rgb(180, 180, 180);
  border-radius: 13px;
  padding: 0.55rem;
  margin: 0 1rem;
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

const Device = (props: { device: IDevice }) => {
  let icon;
  let connectStatus: string = "Device is Offline";
  let connectStatusColor: string = "#bc0303";
  switch (props.device.type) {
    case "bulb":
      icon = (
        <BulbIcon size="12rem" on={props.device.status.isOn} maxSize="40vw" />
      );
      break;
    case "play":
      icon = (
        <MonitorIcon
          size="12rem"
          on={props.device.status.isOn}
          maxSize="40vw"
        />
      );
      break;
    case "strip":
      icon = (
        <StripIcon size="12rem" on={props.device.status.isOn} maxSize="40vw" />
      );
      break;
  }
  if (props.device.status.isConnected) {
    connectStatus = "Connected";
    connectStatusColor = "#a3e635";
  } else if (props.device.status.isConnecting) {
    connectStatus = "Connecting";
    connectStatusColor = "#999999";
  } else if (
    props.device.status.isConnected === false &&
    props.device.status.isConnecting === false
  ) {
    connectStatus = "Device is Offline";
    connectStatusColor = "#e90202";
  }

  return (
    <DeviceWithoutLogic
      initial={{ y: "15em", opacity: 0 }}
      animate={{ y: "0em", opacity: 1 }}
      whileHover={{ scale: 1.03 }}
    >
      <DeviceTypeContainer>
        <DeviceType>{props.device.type[0].toUpperCase() + props.device.type.slice(1)}</DeviceType>
      </DeviceTypeContainer>
      {icon}
      <InformationContainer>
        <DeviceName>{props.device.alias}</DeviceName>
        <DeviceStatus color={connectStatusColor}>{connectStatus}</DeviceStatus>
      </InformationContainer>
    </DeviceWithoutLogic>
  );
};

export default function Devices() {
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
    <InnerContainer>
      <DevicesContainer>
        <AnimatePresence>
          {devices.map((device) => (
            <Device key={v4()} device={device} />
          ))}
        </AnimatePresence>
      </DevicesContainer>
    </InnerContainer>
  );
}
