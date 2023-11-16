import { ZONE_ID } from "../constants";
import { CloudflareApiResponse, makeRequest } from "../makeRequest";

type UpdateRecordResponse = CloudflareApiResponse<{
  id: string;
}>;

export function updateRecord(
  dnsRecordId: string,
  type: "CNAME",
  name: string,
  content: string
) {
  return makeRequest<UpdateRecordResponse>(
    `/zones/${ZONE_ID}/dns_records/${dnsRecordId}`,
    {
      method: "PUT",
      body: JSON.stringify({
        type,
        name,
        content,
        proxied: true,
      }),
    }
  );
}
