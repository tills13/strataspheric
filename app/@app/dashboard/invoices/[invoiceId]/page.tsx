import { s } from "../../../../../sprinkles.css";

import isAfter from "date-fns/isAfter";
import { notFound } from "next/navigation";

import { mustAuth } from "../../../../../auth";
import { AmenityPreviewCard } from "../../../../../components/AmenityPreviewCard";
import { Button } from "../../../../../components/Button";
import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { CreateOrUpdateInvoiceForm } from "../../../../../components/CreateOrUpdateInvoiceForm";
import { DashboardLayout } from "../../../../../components/DashboardLayout";
import { Date as DateComponent } from "../../../../../components/Date";
import { Header } from "../../../../../components/Header";
import { ArrowForwardIcon } from "../../../../../components/Icon/ArrowForwardIcon";
import { DeleteIcon } from "../../../../../components/Icon/DeleteIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { listAmenityBookings } from "../../../../../data/amenities/listAmenityBookings";
import { listThreads } from "../../../../../data/inbox/listThreads";
import { getInvoice } from "../../../../../data/invoices/getInvoice";
import { can } from "../../../../../data/users/permissions";
import { parseTimestamp } from "../../../../../utils/datetime";
import { deleteInvoiceAction } from "../actions";

export default async function Page({
  params,
}: PageProps<"/dashboard/invoices/[invoiceId]">) {
  const invoiceId = (await params).invoiceId;
  const [session, invoice, [amenityBooking]] = await Promise.all([
    mustAuth(),
    getInvoice(invoiceId),
    listAmenityBookings({ invoiceId }),
  ]);

  const inboxMessageThreadResult = await (amenityBooking
    ? listThreads({ amenityBookingId: amenityBooking.id })
    : Promise.resolve(undefined));
  const inboxMessageThread = inboxMessageThreadResult?.results[0];

  if (!can(session.user, "stratas.invoices.view")) {
    notFound();
  }

  return (
    <DashboardLayout
      title="Invoices"
      subPageTitle={`Invoice #${invoice.identifier}`}
    >
      <Stack className={s({ pb: "normal" })} gap="large">
        {!!invoice.isPaid && (
          <InfoPanel level="success">
            <Text>
              This invoice was marked paid{" "}
              <DateComponent
                fw="bold"
                timestamp={invoice.updatedAt}
                compactOutputPrefix
              />
              .
            </Text>
          </InfoPanel>
        )}

        {amenityBooking && inboxMessageThread && (
          <AmenityPreviewCard amenity={amenityBooking.amenity}>
            <InternalLink
              href={`/dashboard/inbox/${inboxMessageThread.threadId}`}
              noUnderline
            >
              <Button
                color="primary"
                icon={<ArrowForwardIcon />}
                iconTextBehaviour="centerRemainder"
                style="primary"
              >
                Go to Booking Request
              </Button>
            </InternalLink>
          </AmenityPreviewCard>
        )}

        {!invoice.isPaid &&
          !!invoice.dueBy &&
          isAfter(new Date(), parseTimestamp(invoice.dueBy)) && (
            <InfoPanel className={s({ mb: "large" })} level="warning">
              <Text>This invoice is overdue.</Text>
            </InfoPanel>
          )}

        <CreateOrUpdateInvoiceForm invoice={invoice} />

        <InfoPanel
          action={
            <ConfirmButton
              icon={<DeleteIcon />}
              onClickConfirm={deleteInvoiceAction.bind(undefined, invoice.id)}
              color="error"
              style="secondary"
            >
              Delete Invoice
            </ConfirmButton>
          }
          header={<Header as="h3">Danger Zone</Header>}
          level="error"
        >
          <Text>Deleting an invoice cannot be undone.</Text>
        </InfoPanel>
      </Stack>
    </DashboardLayout>
  );
}
