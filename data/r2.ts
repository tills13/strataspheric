import { type R2Bucket } from "@cloudflare/workers-types";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export function r2() {
  const { env } = getCloudflareContext();
  return env.R2 as unknown as R2Bucket;
}
