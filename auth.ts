import NextAuth, { NextAuthConfig, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { roleScopeToScopes } from "./data/users/permissions";
import { signInUser } from "./data/users/signInUser";

const isNotDev = process.env.NODE_ENV !== "development";

export const authOptions: NextAuthConfig = {
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.scopes = user.scopes;
      }

      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        return session;
      }

      session.user.id = token.id as string;
      session.user.scopes = token.scopes as string[];

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

        const user = await signInUser(
          credentials.email,
          credentials.password,
          domain,
        );

        return {
          ...user,
          scopes: roleScopeToScopes(user.role),
          id: user.userId,
        };
      },
    }),
  ],
};

export const { auth, handlers } = NextAuth(authOptions);
