import { ProtectedPage } from "../../../../components/ProtectedPage";
import { AmenitiesPage } from "./AmenitiesPage";

export const runtime = "edge";

export default async function Page() {
  return (
    <ProtectedPage permissions={["stratas.amenities.view"]}>
      <AmenitiesPage />
    </ProtectedPage>
  );
}
