import { s } from "../../../../../sprinkles.css";
import * as styles from "./style.css";

import { Header } from "../../../../../components/Header";
import { InboxThreadChats } from "../../../../../components/InboxThreadChats";
import { InfoPanel } from "../../../../../components/InfoPanel";
import { Text } from "../../../../../components/Text";
import { listThreadChats } from "../../../../../data/inbox/listThreadChats";
import { classnames } from "../../../../../utils/classnames";

interface Props {
  threadId: string;
}

export async function InboxThreadChatPanel({ threadId }: Props) {
  const [chats] = await Promise.all([listThreadChats({ threadId })]);

  return (
    <div className={classnames(styles.chatPanelWrapper, s({ p: "normal" }))}>
      <div className={styles.chatPanelContents}>
        <Header as="h2">Chats</Header>

        <InfoPanel level="default">
          <Text>
            Chats are private with authorized members of the council or
            individuals who are explicitly given the ability to see and engage
            with chats.
          </Text>
        </InfoPanel>
        <InboxThreadChats chats={chats} threadId={threadId} />
      </div>
    </div>
  );
}
