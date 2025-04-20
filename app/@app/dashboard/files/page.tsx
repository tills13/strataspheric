import { PageProps } from "../../../../.next/types/app/@app/dashboard/files/page";
import { ProtectedPage } from "../../../../components/ProtectedPage";
import { FilesPage } from "./FilesPage";

export const runtime = "edge";

export default async function Page({ searchParams }: PageProps) {
  const { search, visibility } = await searchParams;
  return (
    <ProtectedPage permissions={["stratas.files.view"]}>
      <FilesPage search={search} visibility={visibility} />
    </ProtectedPage>
  );
}
