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

export async function addCustomDomain(hostname: string) {
  console.log("[addCustomDomain] request", {
    hostname,
    zoneId: ZONE_ID,
    service: CF_WORKER_NAME,
  });

  const result = await makeRequest<CloudflareApiResponse<WorkerCustomDomain>>(
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

  const [response] = result;

  if (response.success) {
    console.log("[addCustomDomain] domain created", {
      id: response.result.id,
      hostname: response.result.hostname,
    });
  } else {
    console.error("[addCustomDomain] Cloudflare API error", {
      errors: response.errors,
      messages: response.messages,
    });
  }

  return result;
}
