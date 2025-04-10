import { headers } from "next/headers";

export async function getDomain() {
  return (await headers()).get("host") || "";
}
