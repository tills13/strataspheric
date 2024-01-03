CREATE TABLE
    emails (
        id text,
        lastStatus text,
        sentAt text DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    thread_emails (threadId text, emailId text, userId text);