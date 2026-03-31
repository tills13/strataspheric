/**
 * Migration runner for Strataspheric
 *
 * Applies pending D1 migrations, tracking which have already run
 * in a `migrations` table.
 *
 * Usage: npx tsx scripts/migrate.ts --local|--remote
 */
import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { createInterface } from "node:readline";

import { getPlatformProxy } from "wrangler";

const MIGRATIONS_DIR = resolve(__dirname, "../migrations");
const SKIP_FILES = new Set(["_remove_all_data.sql"]);
const D1_DATABASE_NAME = "strataspheric";
const PROJECT_ROOT = resolve(__dirname, "..");

async function confirm(message: string): Promise<boolean> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(`${message} (y/N) `, (answer) => {
      rl.close();
      resolve(answer.trim().toLowerCase() === "y");
    });
  });
}

// ---------------------------------------------------------------------------
// Remote helpers — shell out to `wrangler d1 execute` which handles auth
// and actually talks to the remote D1 API.
// ---------------------------------------------------------------------------

function remoteQuery(sql: string): string {
  return execFileSync(
    "npx",
    ["wrangler", "d1", "execute", D1_DATABASE_NAME, "--remote", "--json", "--command", sql],
    { encoding: "utf-8", cwd: PROJECT_ROOT },
  );
}

function remoteExecFile(filePath: string): void {
  execFileSync(
    "npx",
    ["wrangler", "d1", "execute", D1_DATABASE_NAME, "--remote", "--file", filePath],
    { encoding: "utf-8", stdio: "inherit", cwd: PROJECT_ROOT },
  );
}

async function runRemote() {
  console.log(
    "WARNING: You are about to run migrations against the REMOTE database!",
  );
  const ok = await confirm("Are you sure?");
  if (!ok) {
    console.log("Aborted.");
    process.exit(0);
  }

  // Ensure migrations tracking table exists
  remoteQuery(
    "CREATE TABLE IF NOT EXISTS migrations (migration_name text primary key);",
  );

  // Get already-executed migrations
  const raw = remoteQuery(
    "SELECT migration_name FROM migrations ORDER BY migration_name ASC",
  );
  const parsed = JSON.parse(raw) as {
    result: { results: { migration_name: string }[] }[];
  };
  const executed = new Set(
    (parsed.result?.[0]?.results ?? []).map((r) => r.migration_name),
  );

  const files = readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith(".sql") && !SKIP_FILES.has(f))
    .sort();

  let applied = 0;
  for (const file of files) {
    if (executed.has(file)) {
      continue;
    }

    console.log(`Running ${file}...`);

    try {
      remoteExecFile(resolve(MIGRATIONS_DIR, file));
    } catch (err) {
      console.error(`Migration ${file} failed:`, err);
      process.exit(1);
    }

    remoteQuery(`INSERT INTO migrations VALUES ('${file}')`);
    applied++;
  }

  if (applied === 0) {
    console.log("No pending migrations.");
  } else {
    console.log(`Applied ${applied} migration(s).`);
  }
}

// ---------------------------------------------------------------------------
// Local — uses getPlatformProxy which works fine for the local D1 emulator
// ---------------------------------------------------------------------------

async function runLocal() {
  const { env, dispose } = await getPlatformProxy<{ DB: D1Database }>({
    configPath: resolve(__dirname, "../wrangler.jsonc"),
  });

  try {
    const db = env.DB;

    await db
      .prepare(
        "CREATE TABLE IF NOT EXISTS migrations (migration_name text primary key);",
      )
      .run();

    const { results } = await db
      .prepare(
        "SELECT migration_name FROM migrations ORDER BY migration_name ASC",
      )
      .all<{ migration_name: string }>();

    const executed = new Set(results.map((r) => r.migration_name));

    const files = readdirSync(MIGRATIONS_DIR)
      .filter((f) => f.endsWith(".sql") && !SKIP_FILES.has(f))
      .sort();

    let applied = 0;
    for (const file of files) {
      if (executed.has(file)) {
        continue;
      }

      console.log(`Running ${file}...`);

      const sql = readFileSync(resolve(MIGRATIONS_DIR, file), "utf-8");

      try {
        const statements = sql
          .split(";")
          .map((s) => s.replace(/--.*$/gm, "").trim())
          .filter(Boolean);

        for (const stmt of statements) {
          await db.prepare(`${stmt};`).run();
        }
      } catch (err) {
        console.error(`Migration ${file} failed:`, err);
        process.exit(1);
      }

      await db
        .prepare("INSERT INTO migrations VALUES (?)")
        .bind(file)
        .run();

      applied++;
    }

    if (applied === 0) {
      console.log("No pending migrations.");
    } else {
      console.log(`Applied ${applied} migration(s).`);
    }
  } finally {
    await dispose();
  }
}

async function main() {
  const flag = process.argv[2] ?? "--local";

  if (flag !== "--local" && flag !== "--remote") {
    console.error("Usage: npx tsx scripts/migrate.ts [--local|--remote]");
    process.exit(1);
  }

  if (flag === "--remote") {
    await runRemote();
  } else {
    await runLocal();
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
