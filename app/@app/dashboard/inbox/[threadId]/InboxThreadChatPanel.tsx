import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { auth } from "../../../../../auth";
import { Header } from "../../../../../components/Header";
import { InboxThreadChats } from "../../../../../components/InboxThreadChats";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Stack } from "../../../../../components/Stack";
import { Text } from "../../../../../components/Text";
import { getThreadChats } from "../../../../../data/inbox/getThreadChats";
import { getThreadMessages } from "../../../../../data/inbox/getThreadMessages";
import { can, p } from "../../../../../data/users/permissions";
import { classnames } from "../../../../../utils/classnames";
import { upsertFileAction } from "../../files/actions";
import { sendInboxThreadChatAction } from "./actions";

export default async function InboxThreadChatPanel({
  threadId,
}: {
  threadId: string;
}) {
  const [chats] = await Promise.all([getThreadChats(threadId)]);

  return (
    <div className={classnames(styles.chatPanelWrapper, s({ p: "normal" }))}>
      <div className={styles.chatPanelContents}>
        <Header priority={2}>Chats</Header>

        <InfoPanel level="info">
          <Text>
            Chats are private with authorized members of the council or
            individuals who are explicitly given the ability to see and engage
            with chats.
          </Text>
        </InfoPanel>
        <InboxThreadChats
          chats={chats}
          upsertFile={upsertFileAction.bind(undefined, undefined)}
          sendInboxThreadChat={sendInboxThreadChatAction.bind(
            undefined,
            threadId,
            undefined,
          )}
        />
      </div>
    </div>
  );
}
