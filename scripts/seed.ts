/**
 * Seed script for Strataspheric
 *
 * Hashes the seed password, injects it into the seed SQL, and executes
 * against the local D1 database.
 *
 * Usage: npx tsx scripts/seed.ts [--local|--remote]
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createInterface } from "node:readline";

import { getPlatformProxy } from "wrangler";

import { pbkdf2 } from "../utils/authentication";

const SEED_SQL_PATH = resolve(__dirname, "seed.sql");
const PLACEHOLDER =
  "djAxk5uT6G/c6nO/iRpJAYGhgAAAABl2QhGLyYNK3VqhYz+KOKcTLuLy8HWi9HfZ4T1SaQ==";
const SEED_PASSWORD = "password123";

async function confirm(message: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${message} (y/N) `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
}

async function main() {
  const flag = process.argv[2] ?? "--local";

  if (flag !== "--local" && flag !== "--remote") {
    console.error("Usage: npx tsx scripts/seed.ts [--local|--remote]");
    process.exit(1);
  }

  const isRemote = flag === "--remote";

  if (isRemote) {
    console.log(
      "WARNING: You are about to seed the REMOTE database!",
    );
    const ok = await confirm("Are you sure?");
    if (!ok) {
      console.log("Aborted.");
      process.exit(0);
    }
  }

  console.log("Hashing seed password...");
  const hashedPassword = await pbkdf2(SEED_PASSWORD);

  console.log("Reading seed SQL...");
  let sql = readFileSync(SEED_SQL_PATH, "utf-8");
  sql = sql.replaceAll(PLACEHOLDER, hashedPassword);

  const { env, dispose } = await getPlatformProxy<{ DB: D1Database }>({
    configPath: resolve(__dirname, "../wrangler.jsonc"),
    remoteBindings: isRemote,
  });

  try {
    console.log(`Executing seed against ${isRemote ? "remote" : "local"} D1...`);

    const statements = sql
      .split(";")
      .map((s) => s.replace(/--.*$/gm, "").trim())
      .filter(Boolean);

    for (const stmt of statements) {
      await env.DB.prepare(`${stmt};`).run();
    }

    console.log("Seed completed successfully!");
  } finally {
    await dispose();
  }
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
