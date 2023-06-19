"use client";
import { getServerSession } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const { data: session } = useSession();
  return (
    <main>
      <div>Hallo, {session?.user.email}</div>
      <button
        className='bg-red-500 rounded-lg px-4 py-2 text-white'
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </main>
  );
};

export default page;
