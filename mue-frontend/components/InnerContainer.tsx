import { motion } from "framer-motion";
import styled from "styled-components";

const InnerContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: 100%;
  /* padding: 1rem; */
`;

export default InnerContainer;
