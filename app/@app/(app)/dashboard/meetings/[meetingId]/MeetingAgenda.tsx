import * as styles from "./style.css";

import { Header } from "../../../../../../components/Header";
import { MeetingAgendaItem } from "../../../../../../components/MeetingAgendaItem";
import { getMeetingAgendaItems } from "../../../../../../data/meetings/getMeetingAgendaItems";
import { AddNewMeetingAgendaItemButton } from "./AddNewMeetingAgendaItemButton";
import {
  createMeetingAgendaItemAction,
  imperativeUpdateAgendaItemAction,
  removeItemFromAgendaAction,
  updateAgendaItemAction,
} from "./actions";

interface Props {
  className?: string;
  meetingId: string;
}

export async function MeetingAgenda({ className, meetingId }: Props) {
  const agendaItems = await getMeetingAgendaItems(meetingId);

  return (
    <div className={className}>
      <Header className={styles.header} priority={2}>
        Agenda
      </Header>
      <ul className={styles.meetingAgendaList}>
        {agendaItems.map((agendaItem) => (
          <li key={agendaItem.id}>
            <MeetingAgendaItem
              agendaItem={agendaItem}
              imperativeUpdateAgendaItem={imperativeUpdateAgendaItemAction.bind(
                undefined,
                meetingId,
                agendaItem.id,
              )}
              removeAgendaItem={removeItemFromAgendaAction.bind(
                undefined,
                meetingId,
                agendaItem.id,
              )}
              updateAgendaItem={updateAgendaItemAction.bind(
                undefined,
                meetingId,
                agendaItem.id,
              )}
            />
          </li>
        ))}

        <AddNewMeetingAgendaItemButton
          createMeetingAgendaItem={createMeetingAgendaItemAction.bind(
            undefined,
            meetingId,
          )}
        />
      </ul>
    </div>
  );
}
