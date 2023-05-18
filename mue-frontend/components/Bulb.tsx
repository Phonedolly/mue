import styled from "styled-components";
import GlobalLightState from "./GlobalLightState";
import { motion } from "framer-motion";

/**
 * https://www.svgrepo.com/svg/507551/bulb
 */
const BulbOff = styled(motion.div)`
  cursor: pointer;
  width: 40vw;
  height: 40vw;
  max-width: 30rem;
  max-height: 30rem;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z' stroke='%23777777' stroke-width='2'%3E%3C/path%3E%3Cpath d='M10 17H14' stroke='%23777777' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
`;

/**
 * https://www.svgrepo.com/svg/507550/bulb-on
 */
const BulbOn = styled(motion.div)`
  cursor: pointer;
  width: 40vw;
  height: 40vw;
  max-width: 30rem;
  max-height: 30rem;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath d='M12 7C9.23858 7 7 9.23858 7 12C7 13.3613 7.54402 14.5955 8.42651 15.4972C8.77025 15.8484 9.05281 16.2663 9.14923 16.7482L9.67833 19.3924C9.86537 20.3272 10.6862 21 11.6395 21H12.3605C13.3138 21 14.1346 20.3272 14.3217 19.3924L14.8508 16.7482C14.9472 16.2663 15.2297 15.8484 15.5735 15.4972C16.456 14.5955 17 13.3613 17 12C17 9.23858 14.7614 7 12 7Z' stroke='%23000000' stroke-width='2'%3E%3C/path%3E%3Cpath d='M12 4V3' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M18 6L19 5' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M20 12H21' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M4 12H3' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M5 5L6 6' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3Cpath d='M10 17H14' stroke='%23000000' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
`;

const BulbContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
`;

const DescText = styled.p`
  color: #555555;
  font-style: italic;
`;

const Bulb = ({ globallyOn }: { globallyOn: boolean }) => {
  if (globallyOn === true) {
    return (
      <BulbContainer>
        <BulbOn whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.0 }} />
        <GlobalLightState>All Light is On</GlobalLightState>
        <DescText>Tap Bulb to Turn Off All Lights</DescText>
      </BulbContainer>
    );
  } else {
    return (
      <BulbContainer>
        <BulbOff whileHover={{ scale: 1.1 }} whileTap={{ scale: 1.0 }} />
        <GlobalLightState>All Light is Off</GlobalLightState>
        <DescText>Tap Bulb to Turn On All Lights</DescText>
      </BulbContainer>
    );
  }
};

export default Bulb;
