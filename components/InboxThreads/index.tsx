import * as styles from "./style.css";

import { Thread } from "../../data/inbox/getThread";
import { Header } from "../Header";
import { Table } from "../Table";
import { InboxThreadRow } from "./InboxThreadRow";

interface Props {
  archived?: boolean;
  emptyMessage?: string;
  threads: Thread[];
}

export function InboxThreads({
  archived,
  emptyMessage = "There are no messages in your inbox.",
  threads,
}: Props) {
  return (
    <>
      {threads.length === 0 && (
        <div className={styles.inboxMessagesNoMessages}>
          <Header as="h2">Inbox Zero 🎉</Header>
          <p>{emptyMessage}</p>
        </div>
      )}

      <Table className={styles.inboxThreadsTable}>
        {threads.map((thread) => (
          <InboxThreadRow key={thread.id} archived={archived} thread={thread} />
        ))}
      </Table>
    </>
  );
}
