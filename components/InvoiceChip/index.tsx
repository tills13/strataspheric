"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import isAfter from "date-fns/isAfter";
import { useTransition } from "react";

import { markInvoiceAsPaidAction } from "../../app/@app/dashboard/invoices/actions";
import { Invoice } from "../../data/invoices/getInvoice";
import { useCan } from "../../hooks/useCan";
import { classnames } from "../../utils/classnames";
import { parseTimestamp } from "../../utils/datetime";
import { Badge } from "../Badge";
import { Button } from "../Button";
import { Group } from "../Group";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { EditIcon } from "../Icon/EditIcon";
import { InvoiceStatusBadge } from "../InvoiceStatusBadge";
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
    | "id"
    | "status"
    | "identifier"
    | "description"
    | "amount"
    | "isPaid"
    | "dueBy"
  >;

  showEdit?: boolean;
  showMarkPaid?: boolean;
}

export function InvoiceChip({
  className,
  invoice,
  showEdit = false,
  showMarkPaid = true,
}: Props) {
  const [isPending, startTransition] = useTransition();
  const can = useCan();

  return (
    <Panel className={classnames(styles.invoiceChip, className)}>
      {invoice.status === "draft" && (
        <Text className={styles.draftLabel}>DRAFT</Text>
      )}

      <Stack mb="normal">
        <Header as="h3">
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
              {invoice.identifier}
            </Group>
          </Group>
        </Header>

        {invoice.description && (
          <Text className={s({ mb: "normal" })} color="secondary">
            {invoice.description}
          </Text>
        )}
      </Stack>

      <Group justify="space-between">
        <Money amount={invoice.amount} fs="xxl" />

        {can("stratas.invoices.edit") && (
          <Group gap="small">
            {showEdit && (
              <InternalLink href={`/dashboard/invoices/${invoice.id}`}>
                <Button icon={<EditIcon />} style="tertiary" color="primary" />
              </InternalLink>
            )}
            {showMarkPaid && invoice.status !== "draft" && (
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
