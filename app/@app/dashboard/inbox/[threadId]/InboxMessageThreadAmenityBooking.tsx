import { s } from "../../../../../sprinkles.css";

import differenceInDays from "date-fns/differenceInDays";

import { AmenitiesBookingCalendar } from "../../../../../components/AmenitiesBookingCalendar";
import { AmenityChip } from "../../../../../components/AmenityChip";
import { Date } from "../../../../../components/Date";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { EventIcon } from "../../../../../components/Icon/EventIcon";
import { InvoiceChip } from "../../../../../components/InvoiceChip";
import { Panel } from "../../../../../components/Panel";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { Text } from "../../../../../components/Text";
import { Timeline } from "../../../../../components/Timeline";
import { AmenityBooking } from "../../../../../data/amenities/getAmenityBooking";
import { parseTimestamp } from "../../../../../utils/datetime";
import { pluralize } from "../../../../../utils/pluralize";

interface Props {
  amenityBooking: AmenityBooking;
}

export function InboxMessageThreadAmenityBooking({ amenityBooking }: Props) {
  const bookingDuration = differenceInDays(
    parseTimestamp(amenityBooking.endDate),
    parseTimestamp(amenityBooking.startDate),
  );

  return (
    <div className={s({ p: "normal" })}>
      <Panel>
        <Stack>
          <Header priority={3}>Booking Request</Header>

          <AmenitiesBookingCalendar
            amenity={amenityBooking.amenity}
            virtualEvent={{
              endDate: amenityBooking.endDate,
              name: "Current Booking",
              startDate: amenityBooking.startDate,
            }}
          />

          <InvoiceChip invoice={amenityBooking.invoice} />

          <Group>
            <StatusButton style="secondary" color="success">
              Approve Booking
            </StatusButton>
            <StatusButton style="secondary" color="error">
              Reject Booking
            </StatusButton>
          </Group>
        </Stack>
      </Panel>
    </div>
  );
}
