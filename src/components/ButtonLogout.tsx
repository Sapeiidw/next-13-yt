"use client";
import { FC } from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";

interface ButtonLogoutProps {}

const ButtonLogout: FC<ButtonLogoutProps> = ({}) => {
  return (
    <Button variant={"outline"} size={"lg"} onClick={() => signOut()}>
      Sign Out
    </Button>
  );
};

export default ButtonLogout;
