/**
 * Migration runner for Strataspheric
 *
 * Applies pending D1 migrations, tracking which have already run
 * in a `migrations` table.
 *
 * Usage: npx tsx scripts/migrate.ts --local|--remote
 */
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { createInterface } from "node:readline";

const MIGRATIONS_DIR = resolve(__dirname, "../migrations");
const DB_NAME = "strataspheric";
const SKIP_FILES = new Set(["_remove_all_data.sql"]);

function wrangler(target: string, args: string[]) {
  execFileSync("npx", ["wrangler", "d1", "execute", DB_NAME, target, ...args], {
    cwd: resolve(__dirname, ".."),
    stdio: "inherit",
  });
}

function wranglerJson(target: string, command: string): unknown[] {
  const result = execFileSync(
    "npx",
    [
      "wrangler",
      "d1",
      "execute",
      DB_NAME,
      target,
      "--json",
      "--command",
      command,
    ],
    { cwd: resolve(__dirname, "..") },
  );
  const parsed = JSON.parse(result.toString());
  return parsed[0]?.results ?? [];
}

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
  const flag = process.argv[2];

  if (flag !== "--local" && flag !== "--remote") {
    console.error("Usage: npx tsx scripts/migrate.ts --local|--remote");
    process.exit(1);
  }

  if (flag === "--remote") {
    console.log(
      "WARNING: You are about to run migrations against the REMOTE database!",
    );
    const ok = await confirm("Are you sure?");
    if (!ok) {
      console.log("Aborted.");
      process.exit(0);
    }
  }

  // Ensure migrations tracking table exists
  wrangler(flag, [
    "--command",
    "CREATE TABLE IF NOT EXISTS migrations (migration_name text primary key)",
  ]);

  // Get already-executed migrations
  const rows = wranglerJson(
    flag,
    "SELECT migration_name FROM migrations ORDER BY migration_name ASC",
  );
  const executed = new Set(
    rows.map((r) => (r as { migration_name: string }).migration_name),
  );

  // Get all migration files
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
      wrangler(flag, ["--file", resolve(MIGRATIONS_DIR, file)]);
    } catch {
      console.error(`Migration ${file} failed`);
      process.exit(1);
    }

    wrangler(flag, ["--command", `INSERT INTO migrations VALUES ('${file}')`]);
    applied++;
  }

  if (applied === 0) {
    console.log("No pending migrations.");
  } else {
    console.log(`Applied ${applied} migration(s).`);
  }
}

main().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
