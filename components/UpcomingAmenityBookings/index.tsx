import format from "date-fns/format";

import { listUpcomingAmenityBookingsForUser } from "../../data/amenities/listUpcomingAmenityBookingsForUser";
import { Invoice } from "../../data/invoices/getInvoice";
import { parseTimestamp } from "../../utils/datetime";
import { BookingStatusBadge } from "../BookingStatusBadge";
import { Group } from "../Group";
import { Header } from "../Header";
import { InvoiceStatusBadge } from "../InvoiceStatusBadge";
import { InternalLink } from "../Link/InternalLink";
import { Panel } from "../Panel";
import { Stack } from "../Stack";
import { Text } from "../Text";

interface Props {
  userId: string;
}

export async function UpcomingAmenityBookings({ userId }: Props) {
  const bookings = await listUpcomingAmenityBookingsForUser(userId);

  if (bookings.length === 0) {
    return null;
  }

  return (
    <Stack gap="small">
      <Header as="h3">Your Upcoming Bookings</Header>
      <Stack gap="small">
        {bookings.map((booking) => {
          const startDate = parseTimestamp(booking.startDate);
          const endDate = parseTimestamp(booking.endDate);

          const content = (
            <Panel key={booking.id}>
              <Stack gap="small">
                <Group justify="space-between" align="center">
                  <Text fontWeight="bold">{booking.amenity.name}</Text>
                  <Group gap="small">
                    <BookingStatusBadge decision={booking.decision} />
                    {booking.invoice && (
                      <InvoiceStatusBadge
                        invoice={booking.invoice as unknown as Invoice}
                      />
                    )}
                  </Group>
                </Group>
                <Text color="fontTertiary" fontSize="small">
                  {format(startDate, "MMM d, yyyy")} at{" "}
                  {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
                </Text>
              </Stack>
            </Panel>
          );

          if (booking.inboxThreadId) {
            return (
              <InternalLink
                key={booking.id}
                href={`/dashboard/inbox/${booking.inboxThreadId}`}
                noUnderline
              >
                {content}
              </InternalLink>
            );
          }

          return content;
        })}
      </Stack>
    </Stack>
  );
}
