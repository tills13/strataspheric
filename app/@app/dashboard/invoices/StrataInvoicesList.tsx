import * as styles from "./style.css";

import { Group } from "../../../../components/Group";
import { CircleCheckIcon } from "../../../../components/Icon/CircleCheckIcon";
import { DeleteIcon } from "../../../../components/Icon/DeleteIcon";
import { InvoiceStatusBadge } from "../../../../components/InvoiceStatusBadge";
import { Money } from "../../../../components/Money";
import { RemoveButton } from "../../../../components/RemoveButton";
import { StatusButton } from "../../../../components/StatusButton";
import { Table } from "../../../../components/Table";
import { TableRow } from "../../../../components/Table/TableRow";
import { Text } from "../../../../components/Text";
import { Strata } from "../../../../data";
import { Invoice } from "../../../../data/invoices/getInvoice";
import { deleteInvoiceAction, markInvoiceAsPaidAction } from "./actions";

interface Props {
  invoices: Invoice[];
  strata: Strata;
}

export async function StrataInvoicesList({ invoices, strata }: Props) {
  return (
    <>
      {invoices.length === 0 && (
        <Text p="normal">{strata.name} has no invoices on record.</Text>
      )}

      <Table className={styles.invoicesTable}>
        {invoices.map((invoice) => (
          <TableRow
            key={invoice.id}
            rowId={invoice.id}
            actions={
              <Group gap="small">
                <StatusButton
                  action={markInvoiceAsPaidAction.bind(undefined, invoice.id)}
                  disabled={invoice.isPaid === 1}
                  icon={<CircleCheckIcon />}
                  size="small"
                  style="tertiary"
                  color={invoice.isPaid === 1 ? undefined : "success"}
                />

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
              <Group overflow="hidden">
                <Group gap="0" whiteSpace="nowrap">
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

                <Text
                  whiteSpace="nowrap"
                  color="secondary"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  flex={1}
                >
                  {invoice.description?.split("\n")[0]}
                </Text>

                <InvoiceStatusBadge invoice={invoice} />
              </Group>
            }
            link={"/dashboard/invoices/" + invoice.id}
            rowEnd={<Money amount={invoice.amount} />}
          />
        ))}
      </Table>
    </>
  );
}
