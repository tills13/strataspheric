"use client";

import endOfMonth from "date-fns/endOfMonth";
import useSWR from "swr";

import { Calendar } from "../../../../../components/Calendar";
import { Event, Strata } from "../../../../../data";

async function fetchStrataEvents(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = endOfMonth(startDate);

  const response = await fetch(
    `/api/events/listEvents?startDate=${startDate.getTime()}&endDate=${endDate.getTime()}`,
  );

  return (await response.json()).events as Event[];
}

interface Props {
  deleteEventAction: (eventId: string) => void;
  month: number;
  strata: Strata;
  upsertEventAction: (eventId: string | undefined, fd: FormData) => void;
  year: number;
}

export function StrataCalendar({
  deleteEventAction,
  month,
  strata,
  upsertEventAction,
  year,
}: Props) {
  const { data: events = [] } = useSWR(
    [strata.id, "events", year, month],
    ([, , mYear, mMonth]) => fetchStrataEvents(mYear, mMonth),
  );

  return (
    <Calendar
      upsertEvent={upsertEventAction}
      events={events}
      deleteEvent={deleteEventAction}
      month={month}
      year={year}
    />
  );
}
