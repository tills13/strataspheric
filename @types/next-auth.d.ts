import "@auth/core";

declare module "@auth/core" {
  export interface User {
    scope: string;
  }
}
