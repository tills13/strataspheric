import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInMember } from "./data/members/signInMember";
import { type Member } from "./data/members";

export const authOptions: NextAuthConfig = {
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.scope = (user as unknown as Member).role;
      }

      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        return session;
      }

      session.user.scope = token.scope as string;

      return session;
    },
  },
  trustHost: true,
  debug: false,
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, request) {
        if (
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        const domain = request.headers.get("host")!;

        return signInMember(
          credentials.email,
          credentials.password,
          domain
        ) as unknown as User;
      },
    }),
  ],
};

export const { auth, handlers } = NextAuth(authOptions);
