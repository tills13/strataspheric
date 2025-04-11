"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useTransition } from "react";

import { Invoice } from "../../data";
import { p } from "../../data/users/permissions";
import { useCan } from "../../hooks/useCan";
import { classnames } from "../../utils/classnames";
import { Button } from "../Button";
import { Group } from "../Group";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { EditIcon } from "../Icon/EditIcon";
import { InternalLink } from "../Link/InternalLink";
import { Money } from "../Money";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

interface Props {
  className?: string;
  invoice: Invoice;
  markInvoiceAsPaid?: (invoiceId: string) => Promise<void>;
  showEdit?: boolean;
  overrideClassName?: string;
}

export function InvoiceChip({
  className,
  invoice,
  markInvoiceAsPaid,
  showEdit = false,
  overrideClassName,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const can = useCan();

  return (
    <div
      className={overrideClassName || classnames(styles.invoiceChip, className)}
    >
      <Stack gap="xs">
        <Header priority={3}>Invoice #{invoice.identifier}</Header>

        {invoice.description && (
          <Text className={s({ mb: "normal" })} color="secondary">
            {invoice.description}
          </Text>
        )}
      </Stack>

      <Group justify="space-between">
        <Money className={styles.invoiceAmount} amount={invoice.amount} />

        {can(p("stratas", "invoices", "edit")) && (
          <Group gap="small">
            {showEdit && (
              <InternalLink href={`/dashboard/invoices/${invoice.id}`}>
                <Button icon={<EditIcon />} style="tertiary" color="primary" />
              </InternalLink>
            )}
            {markInvoiceAsPaid && (
              <StatusButton
                color="success"
                iconRight={<CircleCheckIcon />}
                iconTextBehaviour="centerRemainder"
                onClick={() =>
                  startTransition(async () => {
                    await markInvoiceAsPaid(invoice.id);
                  })
                }
                isPending={isPending}
                disabled={invoice.isPaid === 1}
                fullWidth={false}
              >
                {invoice.isPaid === 1 ? "Paid" : "Mark Paid"}
              </StatusButton>
            )}
          </Group>
        )}
      </Group>
    </div>
  );
}
