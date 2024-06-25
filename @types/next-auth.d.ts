import { JWT, Session, User } from "next-auth";

declare module "next-auth" {
  export interface SessionUser extends User {
    id: string;
    scopes: string[];
  }

  export interface Session {
    user: SessionUser;
  }
}
