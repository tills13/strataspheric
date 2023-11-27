import "@auth/core";

declare module "@auth/core" {
  export interface JWT {
    something: string;
  }
}
