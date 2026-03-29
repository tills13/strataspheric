import { ProtectedPage } from "../../../../components/ProtectedPage";
import { FilesPage } from "./FilesPage";

export default async function Page({
  searchParams,
}: PageProps<"/dashboard/files">) {
  const { search: rawSearch, visibility: rawVisibility } = await searchParams;
  const search = typeof rawSearch === "string" ? rawSearch : undefined;
  const visibility =
    rawVisibility === "public" || rawVisibility === "private"
      ? rawVisibility
      : undefined;
  return (
    <ProtectedPage permissions={["stratas.files.view"]}>
      <FilesPage search={search} visibility={visibility} />
    </ProtectedPage>
  );
}
