CREATE TABLE IF NOT EXISTS thread_reads (
    userId text NOT NULL,
    threadId text NOT NULL,
    readAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (userId, threadId)
);

-- Migrate existing read state: for threads marked as read (isUnread = 0),
-- create a thread_reads row for the thread creator (senderUserId).
-- This is a best-effort migration since the old model didn't track per-user state.
INSERT OR IGNORE INTO thread_reads (userId, threadId, readAt)
SELECT DISTINCT im.senderUserId, im.threadId, strftime('%s', 'now')
FROM inbox_messages im
WHERE im.id = im.threadId
  AND im.isUnread = 0
  AND im.senderUserId IS NOT NULL;
