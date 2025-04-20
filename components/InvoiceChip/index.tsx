"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useTransition } from "react";

import { markInvoiceAsPaidAction } from "../../app/@app/dashboard/invoices/actions";
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
import { Panel } from "../Panel";
import { Stack } from "../Stack";
import { StatusButton } from "../StatusButton";
import { Text } from "../Text";

interface Props {
  className?: string;
  invoice: Pick<
    Invoice,
    "id" | "status" | "identifier" | "description" | "amount" | "isPaid"
  >;

  showEdit?: boolean;
}

export function InvoiceChip({ className, invoice, showEdit = false }: Props) {
  const [isPending, startTransition] = useTransition();
  const can = useCan();

  return (
    <Panel className={classnames(styles.invoiceChip, className)}>
      {invoice.status === "draft" && (
        <Text className={styles.draftLabel}>DRAFT</Text>
      )}

      <Stack gap="xs">
        <Header as="h3">
          <Group gap="xs">
            <Text color="secondary" as="span" fontSize="xl" fontWeight="light">
              #
            </Text>
            {invoice.identifier}
          </Group>
        </Header>

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
            {invoice.status !== "draft" && (
              <StatusButton
                color="success"
                iconRight={<CircleCheckIcon />}
                iconTextBehaviour="centerRemainder"
                onClick={() =>
                  startTransition(() => markInvoiceAsPaidAction(invoice.id))
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
    </Panel>
  );
}
