import { s } from "../../../../sprinkles.css";

import { auth } from "../../../../auth";
import { Group } from "../../../../components/Group";
import { Header } from "../../../../components/Header";
import { Stack } from "../../../../components/Stack";
import { can } from "../../../../data/users/permissions";
import { CreateNewInvoiceButton } from "./CreateNewInvoiceButton";
import { StrataInvoicesList } from "./StrataInvoicesList";

export const runtime = "edge";

export default async function Page() {
  const session = await auth();

  return (
    <Stack>
      <Group p="normal" justify="space-between">
        <Header as="h2">Invoices</Header>
        <div>
          {can(session?.user, "stratas.invoices.create") && (
            <CreateNewInvoiceButton />
          )}
        </div>
      </Group>

      <StrataInvoicesList />

      {/* <Group p="normal" justify="end">
        <Pagination currentPage={pageNum} totalPages={Math.ceil(total / 10)} />
      </Group> */}
    </Stack>
  );
}
