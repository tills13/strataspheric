/**
 * Reset database for Strataspheric
 *
 * Deletes all data from the D1 database using _remove_all_data.sql.
 *
 * Usage: npx tsx scripts/reset-database.ts --local|--remote
 */
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { createInterface } from "node:readline";

const REMOVE_ALL_SQL = resolve(__dirname, "../migrations/_remove_all_data.sql");
const DB_NAME = "strataspheric";

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
    console.error("Usage: npx tsx scripts/reset-database.ts --local|--remote");
    process.exit(1);
  }

  if (flag === "--remote") {
    console.log(
      "WARNING: You are about to delete ALL data from the REMOTE database!",
    );
    const ok = await confirm("Are you sure?");
    if (!ok) {
      console.log("Aborted.");
      process.exit(0);
    }
  }

  console.log("Removing all data...");
  execFileSync(
    "npx",
    ["wrangler", "d1", "execute", DB_NAME, flag, `--file=${REMOVE_ALL_SQL}`],
    {
      cwd: resolve(__dirname, ".."),
      stdio: "inherit",
    },
  );
  console.log("Database reset complete.");
}

main().catch((err) => {
  console.error("Reset failed:", err);
  process.exit(1);
});
