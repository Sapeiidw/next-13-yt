"use client";
import { FC } from "react";
import { SessionProvider } from "next-auth/react";

interface providersProps {
  children: React.ReactNode;
}

const Providers: FC<providersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Providers;
