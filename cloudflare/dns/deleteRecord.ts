import { ZONE_ID } from "../constants";
import { CloudflareApiResponse, makeRequest } from "../makeRequest";

type CreateRecordResponse = CloudflareApiResponse<{
  id: string;
}>;

export function deleteRecord(recordId: string) {
  return makeRequest<CreateRecordResponse>(
    `/zones/${ZONE_ID}/dns_records/${recordId}`,
    {
      method: "DELETE",
    },
  );
}
