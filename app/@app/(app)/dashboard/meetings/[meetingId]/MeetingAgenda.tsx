import * as styles from "./style.css";

import { Header } from "../../../../../../components/Header";
import { MeetingAgendaItem } from "../../../../../../components/MeetingAgendaItem";
import { getMeetingAgendaItems } from "../../../../../../data/meetings/getMeetingAgendaItems";
import { upsertFileAction } from "../../actions";
import { AddNewMeetingAgendaItemButton } from "./AddNewMeetingAgendaItemButton";
import {
  imperativeUpdateAgendaItemAction,
  removeItemFromAgendaAction,
  upsertAgendaItemAction,
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
              updateAgendaItem={upsertAgendaItemAction.bind(
                undefined,
                meetingId,
                agendaItem.id,
              )}
            />
          </li>
        ))}

        <AddNewMeetingAgendaItemButton
          upsertFile={upsertFileAction.bind(undefined, undefined)}
          upsertMeetingAgendaItem={upsertAgendaItemAction.bind(
            undefined,
            meetingId,
            undefined,
          )}
        />
      </ul>
    </div>
  );
}
