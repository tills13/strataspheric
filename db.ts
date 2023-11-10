import { type D1Database } from "@cloudflare/workers-types";

export function camelToSnakeCase(input: string): string {
  return input.replaceAll(/[A-Z0-9]/g, (match) => "_" + match.toLowerCase());
}

export function parameterize(len: number) {
  return Array.from(new Array(len), () => "?").join(", ");
}

export function db() {
  return process.env.DB as unknown as D1Database;
}
