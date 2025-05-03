import { s } from "../../../../sprinkles.css";

import { DividerText } from "../../../../components/DividerText";
import { Group } from "../../../../components/Group";
import { CircleCheckIcon } from "../../../../components/Icon/CircleCheckIcon";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { InvoiceStatusBadge } from "../../../../components/InvoiceStatusBadge";
import { Money } from "../../../../components/Money";
import { RemoveButton } from "../../../../components/RemoveButton";
import { Stack } from "../../../../components/Stack";
import { StatusButton } from "../../../../components/StatusButton";
import { Table } from "../../../../components/Table";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { listInvoices } from "../../../../data/invoices/listInvoices";
import { mustGetCurrentStrata } from "../../../../data/stratas/getStrataByDomain";
import { deleteInvoiceAction, markInvoiceAsPaidAction } from "./actions";

export async function StrataInvoicesList() {
  const strata = await mustGetCurrentStrata();
  const invoices = await listInvoices({ strataId: strata.id });

  return (
    <>
      {invoices.length === 0 && (
        <Text p="normal">{strata.name} has no invoices on record.</Text>
      )}

      <Table>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.id}
            actions={
              <Group gap="small">
                {invoice.isPaid !== 1 && (
                  <StatusButton
                    action={markInvoiceAsPaidAction.bind(undefined, invoice.id)}
                    icon={<CircleCheckIcon />}
                    size="small"
                    style="tertiary"
                    color="success"
                  />
                )}
                <RemoveButton
                  action={deleteInvoiceAction.bind(undefined, invoice.id)}
                  icon={<DeleteIcon />}
                  size="small"
                  style="tertiary"
                  color="primary"
                />
              </Group>
            }
            content={
              <Group>
                <InvoiceStatusBadge invoice={invoice} />
                <Group gap="xs">
                  <Text
                    color="secondary"
                    as="span"
                    fontSize="xl"
                    fontWeight="light"
                  >
                    #
                  </Text>
                  <Text color="primary" fw="bold" fontSize="large">
                    {invoice.identifier}
                  </Text>
                </Group>

                <Text whiteSpace="nowrap" color="secondary">
                  {invoice.description?.split("\n")[0]}
                </Text>
              </Group>
            }
            link={{ pathname: "/dashboard/invoices/" + invoice.id }}
            rowEnd={<Money amount={invoice.amount} />}
          />
        ))}
      </Table>

      <Stack p="normal">
        <DividerText gravity="left">
          <Text fontSize="large" fw="bold">
            Total Revenue
          </Text>
        </DividerText>

        <Group justify="end">
          <Money
            amount={invoices
              .filter((inv) => inv.isPaid)
              .reduce((acc, i) => acc + i.amount, 0)}
            fontSize="xl"
          />
        </Group>
      </Stack>
    </>
  );
}
