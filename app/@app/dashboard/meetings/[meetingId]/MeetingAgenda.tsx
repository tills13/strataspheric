import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { Header } from "../../../../../components/Header";
import { InfoPanel } from "../../../../../components/InfoPanel";
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
      <Header className={classnames(s({ mb: "normal" }))} as="h2">
        Agenda
      </Header>

      {agendaItems.length === 0 && (
        <InfoPanel className={s({ mb: "normal" })} level="warning">
          You have no agenda items for this meeting. Use the button below to
          create an agenda.
        </InfoPanel>
      )}

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
