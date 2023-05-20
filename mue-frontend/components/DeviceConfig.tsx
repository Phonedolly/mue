import { IDevice } from "@/types/types";
import { styled } from "styled-components";

const DeviceConfigOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const DeviceConfigWithoutLogic = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const closeButton = styled.button`
  background-color: rgb(50, 50, 50);
  color: white;
  
`;

const DeviceConfig = (props: { device: IDevice }) => {
  return (
    <DeviceConfigOverlay>
      <DeviceConfigWithoutLogic>
        <h1>Device config</h1>
      </DeviceConfigWithoutLogic>
    </DeviceConfigOverlay>
  );
};

export default DeviceConfig;
