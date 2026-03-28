"use client";

import endOfMonth from "date-fns/endOfMonth";
import { useState } from "react";
import useSWR from "swr";

import { Calendar } from "../../../../../components/Calendar";
import { DateRange } from "../../../../../components/Calendar/useRangeSelection";
import { CreateOrUpdateEventForm } from "../../../../../components/CreateOrUpdateEventForm";
import { Modal } from "../../../../../components/Modal";
import { Strata } from "../../../../../data";
import { useCan } from "../../../../../hooks/useCan";
import { formatDateForDatetime } from "../../../../../utils/datetime";

async function fetchStrataEvents(year: number, month: number) {
  const startDate = new Date(year, month - 1, 1);
  const endDate = endOfMonth(startDate);

  const response = await fetch(
    `/api/events/listEvents?startDate=${startDate.getTime()}&endDate=${endDate.getTime()}`,
  );

  const json = (await response.json()) as {
    events: Parameters<typeof Calendar>[0]["events"];
  };
  return json.events;
}

interface Props {
  month: number;
  strata: Strata;
  year: number;
}

export function StrataCalendar({ month, strata, year }: Props) {
  const { data: events = [] } = useSWR(
    [strata.id, "events", year, month],
    ([, , mYear, mMonth]) => fetchStrataEvents(mYear, mMonth),
  );

  const can = useCan();
  const canEdit = can("stratas.events.edit");

  const [selectedRange, setSelectedRange] = useState<DateRange | null>(null);

  return (
    <>
      <Calendar
        canEdit={canEdit}
        events={events}
        month={month}
        year={year}
        onRangeSelected={canEdit ? setSelectedRange : undefined}
      />
      {selectedRange && (
        <Modal closeModal={() => setSelectedRange(null)} title="New Event">
          <CreateOrUpdateEventForm
            defaultDate={formatDateForDatetime(selectedRange.start)}
            defaultEndDate={formatDateForDatetime(selectedRange.end)}
            onDeleteEvent={() => setSelectedRange(null)}
          />
        </Modal>
      )}
    </>
  );
}
