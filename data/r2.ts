import { getCloudflareContext } from "@opennextjs/cloudflare";
import { type R2Bucket } from "@cloudflare/workers-types";

export function r2() {
  const { env } = getCloudflareContext();
  return env.R2 as R2Bucket;
}
