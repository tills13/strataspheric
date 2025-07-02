import { s } from "../../sprinkles.css";
import * as styles from "./style.css";

import { Thread } from "../../data/inbox/getThread";
import { Header } from "../Header";
import { Table } from "../Table";
import { InboxThreadRow } from "./InboxThreadRow";

interface Props {
  threads: Thread[];
}

export function InboxThreads({ threads }: Props) {
  return (
    <>
      {threads.length === 0 && (
        <div className={styles.inboxMessagesNoMessages}>
          <Header as="h2">Inbox Zero 🎉</Header>
          <p>There are no messages in your inbox.</p>
        </div>
      )}

      <Table className={s({ ph: "normal" })}>
        {threads.map((thread) => (
          <InboxThreadRow key={thread.id} thread={thread} />
        ))}
      </Table>
    </>
  );
}
