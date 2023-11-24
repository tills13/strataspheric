import { type R2Bucket } from "@cloudflare/workers-types";

export const r2 = process.env.R2 as unknown as R2Bucket;
