"use client";

import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { useTransition } from "react";

import { Invoice } from "../../data";
import { classnames } from "../../utils/classnames";
import { Header } from "../Header";
import { CircleCheckIcon } from "../Icon/CircleCheckIcon";
import { Money } from "../Money";
import { StatusButton } from "../StatusButton";

interface Props {
  className?: string;
  invoice: Invoice;
  markInvoiceAsPaid: (invoiceId: string) => Promise<void>;
  overrideClassName?: string;
}

export function InvoiceChip({
  className,
  invoice,
  markInvoiceAsPaid,
  overrideClassName,
}: Props) {
  const [isPending, startTransition] = useTransition();

  console.log(overrideClassName, 1, classnames(styles.invoiceChip, className));

  return (
    <div
      className={overrideClassName || classnames(styles.invoiceChip, className)}
    >
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
