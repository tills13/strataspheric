import { headers } from "next/headers";

export function getDomain() {
  return headers().get("host") || "";
}
