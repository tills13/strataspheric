import { D1Database } from "@cloudflare/workers-types";

export const EDGE_FUNCTIONS_TABLE_NAME = "edge_fns";

export function db() {
  return process.env.DB as unknown as D1Database;
}
