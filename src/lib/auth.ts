import { NextAuthOptions, getServerSession } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

import { db } from "./db";
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      const dbUser = await db.user.findFirst({
        where: { email: token.email },
        include: { accounts: true },
      });

      if (dbUser) {
        token.id = dbUser.id;
        token.accessToken = dbUser.accounts[0].access_token;
        return token;
      }

      return {
        id: dbUser!.id,
        name: dbUser!.name,
        email: dbUser!.email,
        picture: dbUser!.image,
        accessToken: dbUser!.accounts[0].access_token,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  //   Pages: {},
  session: {
    strategy: "jwt",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
