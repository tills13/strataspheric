import add from "date-fns/add";
import { useEffect, useState } from "react";

import { AmenityBooking } from "../../data/amenities/getAmenityBooking";
import { CalendarEvent } from "../Calendar";

export function useAmenityBookings(
  amenityId: string,
  baseDate: Date,
  excludeBookingId?: string,
  enabled = true,
) {
  const [bookings, setBookings] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (!enabled) return;

    async function fetchAmenityBookings() {
      const queryParams = new URLSearchParams({
        amenityId,
        startTs: baseDate.getTime().toString(),
        endTs: add(baseDate, { weeks: 3 }).getTime().toString(),
      });

      const r = await fetch(
        "/api/amenityBookings/listAmenityBookings?" + queryParams.toString(),
      );

      const rJson = (await r.json()) as { amenityBookings: AmenityBooking[] };

      setBookings(
        rJson.amenityBookings
          .filter((mBooking) => mBooking.id !== excludeBookingId)
          .map((amenityBooking) => ({
            name: "",
            description: "",
            ...amenityBooking,
          })),
      );
    }

    fetchAmenityBookings();
  }, [amenityId, excludeBookingId, baseDate, enabled]);

  return bookings;
}
