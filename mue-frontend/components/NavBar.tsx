"use client";

import styled from "styled-components";
import { NavBarProps } from "../types/props";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import Logo from "./Logo";
import Link from "next/link";

const NavBarOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-color: rgba(10, 10, 10, 0.5);
`;

const NavBarWitoutLogic = styled.div`
  /* box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); */
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 5rem;
  top: 1rem;
  left: 1.2rem;
  z-index: 10;
`;

const NavBarTriggerButtonWithoutLogic = styled.div`
  /* background-color: #fff; */
  border: none;
  outline: none;
  cursor: pointer;
  height: 2.2rem;
  width: 2.2rem;
  /* box-shadow: 0px 0px 5px #ccc; */
  border-radius: 10px;
  background-repeat: no-repeat;
  /**
  * https://www.svgrepo.com/svg/509382/menu
   */
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg' fill='none'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpath fill='%23ffffff' fill-rule='evenodd' d='M19 4a1 1 0 01-1 1H2a1 1 0 010-2h16a1 1 0 011 1zm0 6a1 1 0 01-1 1H2a1 1 0 110-2h16a1 1 0 011 1zm-1 7a1 1 0 100-2H2a1 1 0 100 2h16z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
`;

const NavBarTriggerButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const NavBarItemContainer = styled(motion.ul)`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 12rem;
  flex-direction: column;
  align-items: center;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 2rem 1rem;
  background-color: #222222;
`;
const NavBarItem = styled.li`
  display: flex;
  font-size: 1.4rem;
  font-weight: 700;
  color: white;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border-radius: 1px solid black;
  text-decoration: none;
`;

const navBarItems: { name: string; link: string }[] = [
  { name: "Home", link: "/" },
  { name: "Devices", link: "/devices" },
  { name: "Settings", link: "/settings" },
  { name: "About", link: "/about" },
];

const NavBarTriggerButton = (props: {
  onClick: (e: React.SyntheticEvent) => void;
}) => {
  return (
    <NavBarTriggerButtonContainer>
      <NavBarTriggerButtonWithoutLogic onClick={props.onClick} />
    </NavBarTriggerButtonContainer>
  );
};

const NavBar = (props: NavBarProps) => {
  const { navOpen, setNavOpen } = props;

  const refNav = useRef<HTMLUListElement>(null);

  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (refNav.current && !refNav.current.contains(event.target as Node)) {
        setNavOpen(false);
      }
    }

    if (navOpen === true) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navOpen, setNavOpen]);
  return (
    <AnimatePresence>
      {navOpen === true ? (
        <NavBarOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { stiffness: 0 } }}
          exit={{ opacity: 0 }}
        >
          <NavBarWitoutLogic>
            <NavBarItemContainer
              ref={refNav}
              initial={{
                opacity: 0,
                x: -100,
              }}
              animate={{
                opacity: 1,
                x: "-2em",
              }}
              exit={{
                x: -100,
                opacity: 0,
              }}
            >
              <Logo size="large" />
              {navBarItems.map((item) => (
                <NavBarItem
                  // whileHover={{ scale: 1.05 }}
                  // whileTap={{ scale: 0.95 }}
                  as={Link}
                  href={item.link}
                  key={v4()}
                  onClick={() => setNavOpen(false)}
                >
                  {item.name}
                </NavBarItem>
              ))}
            </NavBarItemContainer>
          </NavBarWitoutLogic>
        </NavBarOverlay>
      ) : null}
    </AnimatePresence>
  );
};

export { NavBar, NavBarTriggerButton };
