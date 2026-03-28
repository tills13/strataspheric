import { ACCOUNT_ID, CF_WORKER_NAME, ZONE_ID } from "../constants";
import { CloudflareApiResponse, makeRequest } from "../makeRequest";

export interface WorkerCustomDomain {
  id: string;
  zone_id: string;
  zone_name: string;
  hostname: string;
  service: string;
  environment: string;
}

export function addCustomDomain(hostname: string) {
  return makeRequest<CloudflareApiResponse<WorkerCustomDomain>>(
    `/accounts/${ACCOUNT_ID}/workers/domains`,
    {
      method: "PUT",
      body: JSON.stringify({
        hostname,
        zone_id: ZONE_ID,
        service: CF_WORKER_NAME,
        environment: "production",
      }),
    },
  );
}
