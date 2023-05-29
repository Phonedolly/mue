"use client";

import { Outfit } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import Container from "@/components/Container";
import { NavBar, NavBarTriggerButton } from "@/components/NavBar";
import GlobalStyle from "./globalStyle";
import { useState } from "react";
import { styled } from "styled-components";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const outfit = Outfit({ subsets: ["latin"] });

const Header = styled.header`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  column-gap: 1.5rem;
`;

const HeaderText = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: white;
  filter: drop-shadow(3px 4px 16px rgb(255, 255, 133, 1));
  margin: 0.2rem;
`;

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navOpen, setNavOpen] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className={outfit.className}>
        <GlobalStyle />
        <body>
          <StyledComponentsRegistry>
            <Container>
              <Header>
                <NavBarTriggerButton onClick={(e) => setNavOpen(!navOpen)} />
                <HeaderText className={pacifico.className}>Mue</HeaderText>
              </Header>

              <NavBar navOpen={navOpen} setNavOpen={setNavOpen} />
              {children}
            </Container>
          </StyledComponentsRegistry>
        </body>
      </html>
    </QueryClientProvider>
  );
}

// import './globals.css'
// import { Inter } from 'next/font/google'

// const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   )
// }
