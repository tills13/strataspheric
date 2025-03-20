export interface User {
  id: string;
  email: string;
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
  key: Record<string, unknown>;
  cookies?: CookieConfig;
}
