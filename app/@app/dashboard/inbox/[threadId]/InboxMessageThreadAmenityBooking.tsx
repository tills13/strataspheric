"use client";

import isAfter from "date-fns/isAfter";
import React, { useMemo } from "react";

import { AmenitiesBookingCalendar } from "../../../../../components/AmenitiesBookingCalendar";
import { AmenityPreviewCard } from "../../../../../components/AmenityPreviewCard";
import { CalendarEvent } from "../../../../../components/Calendar";
import { ConfirmButton } from "../../../../../components/ConfirmButton";
import { DateInput } from "../../../../../components/DateInput";
import { Group } from "../../../../../components/Group";
import { Header } from "../../../../../components/Header";
import { CircleXIcon } from "../../../../../components/Icon/CircleXIcon";
import { SaveIcon } from "../../../../../components/Icon/SaveIcon";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { InvoiceChip } from "../../../../../components/InvoiceChip";
import { Panel } from "../../../../../components/Panel";
import { Stack } from "../../../../../components/Stack";
import { StatusButton } from "../../../../../components/StatusButton";
import { AmenityBooking } from "../../../../../data/amenities/getAmenityBooking";
import { useCan } from "../../../../../hooks/useCan";
import { useSession } from "../../../../../hooks/useSession";
import {
  parseTimestamp,
  patchTimezoneOffset,
} from "../../../../../utils/datetime";
import {
  approveOrRejectAmenityBookingAction,
  cancelAmenityBookingAction,
  updateAmenityBookingDatesAction,
} from "../../amenities/actions";

interface Props {
  className?: string;
  amenityBooking: AmenityBooking;
}

export function InboxMessageThreadAmenityBooking({ amenityBooking }: Props) {
  const can = useCan();
  const session = useSession();
  const isRequester = session?.user.id === amenityBooking.requesterId;
  const virtualEvent = useMemo<CalendarEvent>(
    () => ({
      id: amenityBooking.id,
      endDate: amenityBooking.endDate,
      name: "This Booking",
      startDate: amenityBooking.startDate,
      creatorId: "",
      strataId: "",
      description: "",
      meetingId: "",
    }),
    [amenityBooking],
  );

  return (
    <Panel>
      <Stack>
        <Header as="h3">Booking Request</Header>

        <AmenityPreviewCard amenity={amenityBooking.amenity} />

        <AmenitiesBookingCalendar
          amenity={amenityBooking.amenity}
          booking={virtualEvent}
        />

        {can("stratas.amenity_bookings.edit") && !amenityBooking.decision && (
          <>
            <form
              action={async (fd) => {
                patchTimezoneOffset(fd, "date_start");
                patchTimezoneOffset(fd, "date_end");
                await updateAmenityBookingDatesAction(amenityBooking.id, fd);
              }}
            >
              <Stack>
                <DateInput
                  name="date"
                  defaultStartValue={amenityBooking.startDate}
                  defaultEndValue={amenityBooking.endDate}
                  type="range"
                />
                <StatusButton
                  color="primary"
                  icon={<SaveIcon />}
                  style="secondary"
                  type="submit"
                >
                  Update Dates
                </StatusButton>
              </Stack>
            </form>

            {amenityBooking.invoice && (
              <InvoiceChip invoice={amenityBooking.invoice} />
            )}

            <InfoPanel level="default">
              Approving the booking will lock in the date for the booking,
              publish the above invoice, and automatically generate a response
              to this thread with the invoice attached. Rejecting the booking
              will delete the invoice and generate a response to this thread.
            </InfoPanel>

            <Group equalWidthChildren>
              <StatusButton
                action={approveOrRejectAmenityBookingAction.bind(
                  undefined,
                  amenityBooking.id,
                  "approve",
                )}
                style="secondary"
                color="success"
                iconTextBehaviour="centerGlobal"
              >
                Approve
              </StatusButton>
              <StatusButton
                action={approveOrRejectAmenityBookingAction.bind(
                  undefined,
                  amenityBooking.id,
                  "reject",
                )}
                style="secondary"
                color="error"
                iconTextBehaviour="centerGlobal"
              >
                Reject
              </StatusButton>
            </Group>
          </>
        )}

        {!amenityBooking.decision && isRequester && (
          <ConfirmButton
            confirmModalTitle="Cancel Booking"
            confirmModalDescription="Are you sure you want to cancel this booking request?"
            confirmModalConfirmButtonType="error"
            onClickConfirm={() => cancelAmenityBookingAction(amenityBooking.id)}
            icon={<CircleXIcon />}
            color="error"
            style="secondary"
            fullWidth
          >
            Cancel Booking
          </ConfirmButton>
        )}

        {amenityBooking.decision && (
          <>
            <InfoPanel
              alignment="center"
              level={
                amenityBooking.decision === "approved" ? "success" : "error"
              }
            >
              Booking {amenityBooking.decision}
            </InfoPanel>

            {amenityBooking.decision === "approved" &&
              (isRequester || can("stratas.amenity_bookings.edit")) &&
              isAfter(parseTimestamp(amenityBooking.startDate), new Date()) && (
                <ConfirmButton
                  confirmModalTitle="Cancel Booking"
                  confirmModalDescription="Are you sure you want to cancel this booking? The associated event and invoice will be removed."
                  confirmModalConfirmButtonType="error"
                  onClickConfirm={() =>
                    cancelAmenityBookingAction(amenityBooking.id)
                  }
                  icon={<CircleXIcon />}
                  color="error"
                  style="secondary"
                  fullWidth
                >
                  Cancel Booking
                </ConfirmButton>
              )}
          </>
        )}
      </Stack>
    </Panel>
  );
}
