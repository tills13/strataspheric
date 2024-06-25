"use client";

import { s } from "../../../../../../sprinkles.css";

import { useState } from "react";
import useSWR from "swr";

import { MeetingTimelineIcon } from "../../../../../../components/MeetingTimelineIcon";
import { MeetingTimelineItem } from "../../../../../../components/MeetingTimelineItem";
import { SelectField } from "../../../../../../components/SelectField";
import { Timeline } from "../../../../../../components/Timeline";
import { NewMeetingAgendaItem } from "../../../../../../data";
import { StrataActivity } from "../../../../../api/stratas/listActivity/route";

async function fetchStrataEvents(activityType: string | undefined) {
  // const startDate = new Date(year, month - 1, 1);
  // const endDate = endOfMonth(startDate);

  const searchParams = new URLSearchParams();

  if (activityType) {
    searchParams.set("activityType", activityType);
  }

  const response = await fetch(
    `/api/stratas/listActivity?${searchParams.toString()}`,
  );

  return (await response.json()).activity as StrataActivity[];
}

export interface Props {
  addItemToAgendaAction: (
    meetingId: string,
    item: NewMeetingAgendaItem,
  ) => void;
  strataId: string;
  meetingId: string;
}

export function StrataActivityTimelime({
  addItemToAgendaAction,
  strataId,
  meetingId,
}: Props) {
  const [activityType, setActivityType] = useState<string>();
  const { data: timeline = [] } = useSWR(
    [strataId, "activity", `type=${activityType}`],
    () => fetchStrataEvents(activityType),
  );

  return (
    <>
      <SelectField
        className={s({ mb: "normal" })}
        onChange={(e) => setActivityType(e.target.value)}
      >
        <option value="event">Events</option>
        <option value="chat">Chats</option>
        <option value="inbox_message">Messages</option>
        <option value="file">Files</option>
        <option value="invoice">Invoices</option>
      </SelectField>

      <Timeline
        emptyMessage={`No recent ${activityType} activity`}
        items={timeline.map((item) => ({
          icon: <MeetingTimelineIcon type={item.type} />,
          contents: (
            <MeetingTimelineItem
              key={item.id}
              addItemToAgenda={addItemToAgendaAction.bind(
                undefined,
                meetingId,
                item,
              )}
              {...item}
            />
          ),
        }))}
      />
    </>
  );
}
