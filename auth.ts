import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { signInMember } from "./data/members/signInMember";
import { StrataMember } from "./data/members/getStrataMembers";

const isNotDev = process.env.NODE_ENV !== "development";

export const authOptions: NextAuthConfig = {
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.scope = (user as unknown as StrataMember).role;
      }

      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        return session;
      }

      session.user.id = token.id as string;
      session.user.scope = token.scope as string;

      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: (isNotDev ? "__Secure-" : "") + "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        domain: isNotDev ? ".strataspheric.app" : "",
        secure: isNotDev,
      },
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
