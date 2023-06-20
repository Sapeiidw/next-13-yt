"use client";
import { FC } from "react";
import { SessionProvider } from "next-auth/react";
import { ToastProvider } from "./ui/toast";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface providersProps {
  children: React.ReactNode;
}

const Providers: FC<providersProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <ToastProvider />
    </SessionProvider>
  );
};

export default Providers;
