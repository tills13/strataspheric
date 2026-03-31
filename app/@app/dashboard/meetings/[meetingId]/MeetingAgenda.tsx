import * as styles from "./style.css";

import { Header } from "../../../../../components/Header";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { MeetingAgendaItem } from "../../../../../components/MeetingAgendaItem";
import { MeetingAgendaProgress } from "../../../../../components/MeetingAgendaItem/Progress";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { listMeetingAgendaItems } from "../../../../../data/meetings/listMeetingAgendaItems";
import { listMeetingAttendees } from "../../../../../data/meetings/listMeetingAttendees";
import { classnames } from "../../../../../utils/classnames";
import { AddNewMeetingAgendaItemButton } from "./AddNewMeetingAgendaItemButton";
import { GenerateMeetingMinutesButton } from "./GenerateMeetingMinutesButton";

interface Props {
  className?: string;
  meetingId: string;
}

export async function MeetingAgenda({ className, meetingId }: Props) {
  const [agendaItems, attendees] = await Promise.all([
    listMeetingAgendaItems(meetingId),
    listMeetingAttendees(meetingId),
  ]);

  const doneCount = agendaItems.filter((item) => item.done === 1).length;
  const allDone = agendaItems.length > 0 && doneCount === agendaItems.length;

  return (
    <Stack className={className}>
      <Header as="h3">Agenda</Header>

      {agendaItems.length === 0 && (
        <InfoPanel
          className={styles.meetingAgendaEmptyInfoPanel}
          level="hint"
          align="center"
          justify="center"
        >
          <Text textAlign="center">
            <strong>You have no agenda items for this meeting.</strong>
            <br />
            Use the button below to create an agenda.
          </Text>
        </InfoPanel>
      )}

      {agendaItems.length !== 0 && (
        <>
          <MeetingAgendaProgress
            className={styles.meetingAgendaProgress}
            stuckClassName={styles.meetingAgendaProgressStuck}
            doneCount={doneCount}
            totalCount={agendaItems.length}
          />

          <ul className={classnames(styles.meetingAgendaList)}>
            {agendaItems.map((agendaItem, i) => (
              <li key={agendaItem.id} className={styles.meetingAgendaListItem}>
                <MeetingAgendaItem
                  agendaItem={agendaItem}
                  attendees={attendees}
                  index={i + 1}
                  isFirst={i === 0}
                  isLast={i === agendaItems.length - 1}
                  meetingId={meetingId}
                />
              </li>
            ))}
          </ul>
        </>
      )}

      <AddNewMeetingAgendaItemButton meetingId={meetingId} />

      {allDone && <GenerateMeetingMinutesButton meetingId={meetingId} />}
    </Stack>
  );
}
