import styled from "styled-components";
import { NavBarProps } from "../types/props";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const NavBarWitoutLogic = styled.nav<NavBarProps>`
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  background-color: yellowgreen;
  height: calc(${(props: NavBarProps) => props.numOfItems * 60 + 60}) px;
  width: 5rem;
  top: 32px;
  left: 10px;
  z-index: 10;
`;

const NavBarTriggerButtonWithoutLogic = styled.button`
  /* background-color: #fff; */
  border: none;
  outline: none;
  cursor: pointer;
  font-family: "OutfitBold";
  height: 1.8rem;
  width: 1.8rem;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 10px;
  background-repeat: no-repeat;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z' fill='%23000000'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
`;

const NavBarTriggerButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const NavBarItemContainer = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
`;
const NavBarItemWithoutLogic = styled.li`
  display: flex;
  font-family: "OutfitBold";
  font-size: 1.2rem;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border-radius: 1px solid black;
`;

const navBarItems: { name: string; link: string }[] = [
  { name: "Home", link: "/" },
  { name: "Devices", link: "/devices" },
  { name: "About", link: "/about" },
];

const NavBarTriggerButton = () => {
  return (
    <NavBarTriggerButtonContainer>
      <NavBarTriggerButtonWithoutLogic />
    </NavBarTriggerButtonContainer>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <NavBarWitoutLogic numOfItems={navBarItems.length}>
      <NavBarTriggerButton />
      {isOpen === true ? (
        <AnimatePresence>
          <NavBarItemContainer>
            {navBarItems.map((item) => (
              <NavBarItemWithoutLogic>{item.name}</NavBarItemWithoutLogic>
            ))}
          </NavBarItemContainer>
        </AnimatePresence>
      ) : null}
    </NavBarWitoutLogic>
  );
};

export default NavBar;
