import { ProtectedPage } from "../../../../components/ProtectedPage";
import { FilesPage } from "./FilesPage";


export default async function Page({ searchParams }: PageProps<"/dashboard/files">) {
  const { search, visibility } = await searchParams;
  return (
    <ProtectedPage permissions={["stratas.files.view"]}>
      <FilesPage search={search} visibility={visibility} />
    </ProtectedPage>
  );
}
