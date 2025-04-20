import * as styles from "./style.css";

import { Header } from "../../../../../components/Header";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { MeetingAgendaItem } from "../../../../../components/MeetingAgendaItem";
import { Stack } from "../../../../../components/Stack";
import { listMeetingAgendaItems } from "../../../../../data/meetings/listMeetingAgendaItems";
import { classnames } from "../../../../../utils/classnames";
import { AddNewMeetingAgendaItemButton } from "./AddNewMeetingAgendaItemButton";

interface Props {
  className?: string;
  meetingId: string;
}

export async function MeetingAgenda({ className, meetingId }: Props) {
  const agendaItems = await listMeetingAgendaItems(meetingId);

  return (
    <Stack className={className}>
      <Header as="h3">Agenda</Header>

      {agendaItems.length === 0 && (
        <InfoPanel level="warning">
          You have no agenda items for this meeting. Use the button below to
          create an agenda.
        </InfoPanel>
      )}

      {agendaItems.length !== 0 && (
        <ul className={classnames(styles.meetingAgendaList)}>
          {agendaItems.map((agendaItem) => (
            <li key={agendaItem.id} className={styles.meetingAgendaListItem}>
              <MeetingAgendaItem
                agendaItem={agendaItem}
                meetingId={meetingId}
              />
            </li>
          ))}
        </ul>
      )}

      <AddNewMeetingAgendaItemButton meetingId={meetingId} />
    </Stack>
  );
}
