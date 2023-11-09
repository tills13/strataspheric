import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginMember } from "./data/members/loginMember";
import { Member } from "./data/members";

export const authOptions: NextAuthConfig = {
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.scope = user as Member;
      }

      return token;
    },
    async session({ session, token }) {
      // const user = await

      // const user = { ...session.user };

      if (!session.user) {
        return session;
      }

      (session.user as any).scope = token.scope;

      return session;
    },
  },
  //   cookies: {
  //     pkceCodeVerifier: {
  //       name: "next-auth.pkce.code_verifier",
  //       options: {
  //         httpOnly: true,
  //         sameSite: "none",
  //         path: "/",
  //         secure: true,
  //       },
  //     },
  //   },
  trustHost: true,
  debug: true,
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

        return loginMember(credentials.email, credentials.password, domain);
      },
    }),
  ],
};

export const { auth, handlers } = NextAuth(authOptions);
