CREATE TABLE
    emails (
        id text,
        lastStatus text,
        sentAt INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
        updatedAt INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
    );

CREATE TABLE
    thread_emails (threadId text, emailId text, userId text);