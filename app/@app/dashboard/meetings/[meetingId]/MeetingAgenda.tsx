import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { Header } from "../../../../../components/Header";
import { MeetingAgendaItem } from "../../../../../components/MeetingAgendaItem";
import { getMeetingAgendaItems } from "../../../../../data/meetings/getMeetingAgendaItems";
import { classnames } from "../../../../../utils/classnames";
import { upsertFileAction } from "../../files/actions";
import { AddNewMeetingAgendaItemButton } from "./AddNewMeetingAgendaItemButton";
import {
  addItemToAgendaAction,
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
      <Header
        className={classnames(styles.header, s({ mb: "large" }))}
        priority={2}
      >
        Agenda
      </Header>

      {agendaItems.length !== 0 && (
        <ul
          className={classnames(styles.meetingAgendaList, s({ mb: "large" }))}
        >
          {agendaItems.map((agendaItem) => (
            <li key={agendaItem.id} className={styles.meetingAgendaListItem}>
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
                upsertFile={upsertFileAction.bind(undefined, undefined)}
              />
            </li>
          ))}
        </ul>
      )}

      <AddNewMeetingAgendaItemButton
        addItemToAgendaAction={addItemToAgendaAction}
        meetingId={meetingId}
        upsertFile={upsertFileAction.bind(undefined, undefined)}
        upsertMeetingAgendaItem={upsertAgendaItemAction.bind(
          undefined,
          meetingId,
          undefined,
        )}
      />
    </div>
  );
}
