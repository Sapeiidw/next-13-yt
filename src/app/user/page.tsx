import { getServerSession } from "next-auth";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession();
  return <div>Hallo, {session?.user.email}</div>;
};

export default page;
