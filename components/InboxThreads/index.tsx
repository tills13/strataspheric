import * as styles from "./style.css";

import { Thread } from "../../data/inbox/getThread";
import { NothingHere } from "../NothingHere";
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
      {threads.length === 0 && <NothingHere>{emptyMessage}</NothingHere>}

      <Table className={styles.inboxThreadsTable}>
        {threads.map((thread) => (
          <InboxThreadRow key={thread.id} archived={archived} thread={thread} />
        ))}
      </Table>
    </>
  );
}
