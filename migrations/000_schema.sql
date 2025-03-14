DROP TABLE IF EXISTS stratas;

CREATE TABLE
    IF NOT EXISTS stratas (
        id text primary key,
        name text,
        domain text,
        numUnits integer,
        strataId text,
        streetAddress text,
        postalCode text,
        provinceState text,
        isPublic boolean,
        createdAt INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
    );

DROP TABLE IF EXISTS strata_plans;

CREATE TABLE
    IF NOT EXISTS strata_plans (
        id text primary key,
        strataId text,
        numSeats integer,
        enableInbox boolean DEFAULT FALSE
    );

DROP TABLE IF EXISTS strata_widgets;

CREATE TABLE
    IF NOT EXISTS strata_widgets (
        id text primary key,
        strataId text,
        type text,
        title text
    );

DROP TABLE IF EXISTS files;

CREATE TABLE
    IF NOT EXISTS files (
        id text primary key,
        name text,
        description text,
        path text,
        strataId text,
        createdAt INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
    );

DROP TABLE IF EXISTS widget_files;

CREATE TABLE
    IF NOT EXISTS widget_files (
        fileId string,
        widgetId string,
        primary key (fileId, widgetId)
    );

DROP TABLE IF EXISTS events;

CREATE TABLE
    IF NOT EXISTS events (
        id text primary key,
        name text,
        description text,
        startDate INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
        endDate INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
    );

DROP TABLE IF EXISTS widget_events;

CREATE TABLE
    IF NOT EXISTS widget_events (
        eventId string,
        widgetId string,
        primary key (eventId, widgetId)
    );

DROP TABLE IF EXISTS users;

CREATE TABLE
    IF NOT EXISTS users (id text primary key, email text, password text);

DROP TABLE IF EXISTS user_password_reset_tokens;

CREATE TABLE
    IF NOT EXISTS user_password_reset_tokens (
        token text primary key,
        userId text,
        createdAt INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
    );

DROP TABLE IF EXISTS strata_memberships;

CREATE TABLE
    IF NOT EXISTS strata_memberships (
        strataId text,
        userId text,
        unit text,
        role text,
        name text,
        email text,
        phoneNumber text,
        isPaid boolean DEFAULT FALSE,
        primary key (strataId, userId)
    );

DROP TABLE IF EXISTS inbox_messages;

CREATE TABLE
    IF NOT EXISTS inbox_messages (
        id text,
        strataId text,
        threadId text,
        fileId text,
        viewId text,
        subject text,
        message text,
        senderUserId text,
        senderName text,
        senderEmail text,
        senderPhoneNumber text,
        sentAt INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
        isUnread boolean DEFAULT TRUE
    );

DROP TABLE IF EXISTS inbox_thread_chats;

CREATE TABLE
    IF NOT EXISTS inbox_thread_chats (
        id text primary key,
        threadId text,
        messageId text,
        chatId text,
        fileId text,
        message text,
        userId text,
        sentAt INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
    );