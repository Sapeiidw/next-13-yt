"use client";
import ButtonLogout from "@/components/ButtonLogout";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { getAuthSession } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user", "profile"],
    queryFn: () =>
      axios.get("http://localhost:3000/api/user").then((res) => res.data),
  });
  const { data: session } = useSession();
  const { toast } = useToast();

  return (
    <main>
      <div>Hallo, {JSON.stringify(session?.user.name)}</div>
      <Image
        alt='profile'
        src={session?.user.image || ""}
        width={100}
        height={100}
        className='aspect-square rounded-full'
      />
      <br />
      <div>{JSON.stringify(data)}</div>
      <Button
        variant='outline'
        onClick={() => {
          toast({
            title: "Scheduled: Catch up ",
            description: "Friday, February 10, 2023 at 5:57 PM",
            action: (
              <ToastAction altText='Goto schedule to undo'>Undo</ToastAction>
            ),
          });
        }}
      >
        Add to calendar
      </Button>
      <ButtonLogout />
    </main>
  );
};

export default page;
