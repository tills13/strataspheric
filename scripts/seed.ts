/**
 * Seed script for Strataspheric
 *
 * Hashes the seed password, injects it into the seed SQL, and executes
 * against the local D1 database via wrangler.
 *
 * Usage: npx tsx scripts/seed.ts
 */

import { execFileSync } from "node:child_process";
import { readFileSync, unlinkSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

import { pbkdf2 } from "../utils/authentication";

const SEED_PASSWORD = "password123";
const SEED_SQL_PATH = resolve(__dirname, "seed.sql");
const PLACEHOLDER =
  "djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==";

async function main() {
  console.log("Hashing seed password...");
  const hashedPassword = await pbkdf2(SEED_PASSWORD);

  console.log("Reading seed SQL...");
  let sql = readFileSync(SEED_SQL_PATH, "utf-8");

  // Replace placeholder password hash with real one
  sql = sql.replaceAll(PLACEHOLDER, hashedPassword);

  // Write to a temp file since wrangler --command has length limits
  const tmpPath = resolve(__dirname, ".seed-tmp.sql");
  writeFileSync(tmpPath, sql, "utf-8");

  console.log("Executing seed against local D1...");
  try {
    execFileSync("npx", ["wrangler", "d1", "execute", "strataspheric", "--local", `--file=${tmpPath}`, "--yes"], {
      cwd: resolve(__dirname, ".."),
      stdio: "inherit",
    });
    console.log("Seed completed successfully!");
  } finally {
    unlinkSync(tmpPath);
  }
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
