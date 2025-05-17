import { s } from "../../../../../sprinkles.css";

import isAfter from "date-fns/isAfter";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageProps } from "../../../../../.next/types/app/@app/dashboard/invoices/[invoiceId]/page";
import { mustAuth } from "../../../../../auth";
import { AmenitiesBookingCalendar } from "../../../../../components/AmenitiesBookingCalendar";
import { AmenityChip } from "../../../../../components/AmenityChip";
import { Button } from "../../../../../components/Button";
import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { CreateOrUpdateInvoiceForm } from "../../../../../components/CreateOrUpdateInvoiceForm";
import { Date as DateComponent } from "../../../../../components/Date";
import { Flex } from "../../../../../components/Flex";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { ArrowForwardIcon } from "../../../../../components/Icon/ArrowForwardIcon";
import { DeleteIcon } from "../../../../../components/Icon/DeleteIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { InternalLink } from "../../../../../components/Link/InternalLink";
import { Panel } from "../../../../../components/Panel";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { listAmenityBookings } from "../../../../../data/amenities/listAmenityBookings";
import { listThreads } from "../../../../../data/inbox/listThreads";
import { getInvoice } from "../../../../../data/invoices/getInvoice";
import { can } from "../../../../../data/users/permissions";
import { parseTimestamp } from "../../../../../utils/datetime";
import { deleteInvoiceAction } from "../actions";

export const runtime = "edge";

export default async function Page({ params }: PageProps) {
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
    <Stack className={s({ ph: "normal", pb: "normal" })} gap="large">
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
        <Panel>
          <Stack>
            <Flex justify="space-between" from="mobilePlus">
              <Header as="h3">
                This invoice references an amenity booking.
              </Header>
              <InternalLink
                href={`/dashboard/inbox/${inboxMessageThread.threadId}`}
                noUnderline
              >
                <Button
                  color="primary"
                  iconRight={<ArrowForwardIcon />}
                  iconTextBehaviour="centerRemainder"
                  style="primary"
                >
                  Go to Booking Request
                </Button>
              </InternalLink>
            </Flex>
            <AmenitiesBookingCalendar
              amenity={amenityBooking.amenity}
              booking={amenityBooking}
              loadOtherBookings={false}
            />
          </Stack>
        </Panel>
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
            iconRight={<DeleteIcon />}
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
  );
}
