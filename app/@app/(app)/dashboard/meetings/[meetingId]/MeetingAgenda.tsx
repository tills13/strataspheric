import * as styles from "./style.css";

import { Header } from "../../../../../../components/Header";
import { MeetingAgendaItem } from "../../../../../../components/MeetingAgendaItem";
import { getMeetingAgendaItems } from "../../../../../../data/meetings/getMeetingAgendaItems";
import {
  imperativeUpdateAgendaItemAction,
  removeItemFromAgendaAction,
  updateAgendaItemAction,
} from "./actions";

interface Props {
  meetingId: string;
}

export async function MeetingAgenda({ meetingId }: Props) {
  const agendaItems = await getMeetingAgendaItems(meetingId);

  return (
    <div>
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
      </ul>
    </div>
  );
}
