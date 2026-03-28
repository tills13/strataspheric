import { ACCOUNT_ID } from "../constants";
import { CloudflareApiResponse, makeRequest } from "../makeRequest";
import { WorkerCustomDomain } from "./addCustomDomain";

export type Status = "active" | "pending";

export interface GetCustomDomainData extends WorkerCustomDomain {}

export function getCustomDomain(domainId: string) {
  return makeRequest<CloudflareApiResponse<GetCustomDomainData>>(
    `/accounts/${ACCOUNT_ID}/workers/domains/${domainId}`,
    {
      method: "GET",
    },
  );
}
