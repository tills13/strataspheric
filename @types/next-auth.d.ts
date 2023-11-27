import { JWT, Session, User } from "next-auth";

declare module "next-auth" {
  export interface SessionUser extends User {
    scopes: string[];
  }

  export interface Session {
    user: SessionUser;
  }
}
