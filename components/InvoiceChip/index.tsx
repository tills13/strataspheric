"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useTransition } from "react";

import { Invoice } from "../../data";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { Money } from "../Money";
import { StatusButton } from "../StatusButton";

interface Props {
  invoice: Invoice;
  markInvoiceAsPaid: (invoiceId: string) => Promise<void>;
}

export function InvoiceChip({ invoice, markInvoiceAsPaid }: Props) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className={styles.invoiceChip}>
      <Header className={s({ mb: "normal" })} priority={3}>
        Invoice #{invoice.identifier}
      </Header>

      {invoice.description && (
        <p className={s({ mb: "normal" })}>{invoice.description}</p>
      )}

      <div className={styles.invoiceAmountContainer}>
        <Money className={styles.invoiceAmount} amount={invoice.amount} />

        <StatusButton
          className={styles.markPaidButton}
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
      </div>
    </div>
  );
}
