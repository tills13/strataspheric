import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { findStrataMemberships } from "./data/strataMemberships/findStrataMemberships";
import { roleScopeToScopes } from "./data/users/permissions";
import { signInUser } from "./data/users/signInUser";
import { getDomain } from "./utils/getDomain";

const isNotDev = process.env.NODE_ENV !== "development";

export const authOptions: NextAuthConfig = {
  callbacks: {
    jwt({ user, token, ...rest }, ...other) {
      if (user) {
        token.id = user.id;
      }

      token.something;

      return token;
    },
    async session({ session, token, ...rest }, ...other) {
      if (!session.user) {
        return session;
      }

      const [membership] = await findStrataMemberships({
        domain: getDomain(),
        userId: token.id as string,
      });

      session.user.id = token.id as string;
      session.user.scopes = roleScopeToScopes(membership?.role);

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
        domain: isNotDev ? ".strataspheric.app" : ".strataspheric.local",
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
      authorize(credentials) {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          return null;
        }

        return signInUser(credentials.email, credentials.password);
      },
    }),
  ],
};

export const { auth, handlers } = NextAuth(authOptions);
