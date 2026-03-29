CREATE TABLE IF NOT EXISTS thread_archives (
    userId text NOT NULL,
    threadId text NOT NULL,
    archivedAt INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
    PRIMARY KEY (userId, threadId)
);

-- Migrate existing archived state: for threads with archivedAt set,
-- create a thread_archives row for the thread creator (senderUserId).
-- Best-effort since the old model didn't track per-user state.
INSERT OR IGNORE INTO thread_archives (userId, threadId, archivedAt)
SELECT DISTINCT im.senderUserId, im.threadId, im.archivedAt
FROM inbox_messages im
WHERE im.id = im.threadId
  AND im.archivedAt IS NOT NULL
  AND im.senderUserId IS NOT NULL;
