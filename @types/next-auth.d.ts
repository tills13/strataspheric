import "next-auth";

declare module "next-auth" {
  export interface User {
    scopes: string[];
  }
}
