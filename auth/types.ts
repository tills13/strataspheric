import { NextRequest, NextResponse } from "next/server";

export interface User {
  id: string;
  email: string;
  name: string;
  scopes: string[];
}

export interface Session {
  exp: number;
  user: User;
}

export interface CookieConfig {
  httpOnly: boolean;
  sameSite: "lax" | "strict";
  path: string;
  domain: string;
  secure: boolean;
}

export interface Config {
  decorateSessionUser: (baseUser: User) => User | Promise<User>;
  key: Record<string, unknown>;
  cookies?: CookieConfig;
}

export type AuthenticatedApiHandler = (
  session: Session,
  req: NextRequest,
) => Promise<NextResponse | Response>;
