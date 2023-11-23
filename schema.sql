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
        isPublic boolean
    );

DROP TABLE IF EXISTS strata_plans;

CREATE TABLE
    IF NOT EXISTS strata_plans (
        id text primary key,
        strataId text,
        numSeats integer
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
        createdAt text DEFAULT CURRENT_TIMESTAMP
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
        date text
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
        token text,
        userId text,
        createdAt text DEFAULT CURRENT_TIMESTAMP,
        primary key (token)
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
        sentAt text DEFAULT CURRENT_TIMESTAMP,
        isUnread boolean DEFAULT TRUE
    );

DROP TABLE IF EXISTS inbox_thread_chats;

CREATE TABLE
    IF NOT EXISTS inbox_thread_chats (
        id text,
        threadId text,
        messageId text,
        chatId text,
        fileId text,
        message text,
        userId text,
        sentAt text DEFAULT CURRENT_TIMESTAMP,
        primary key (id)
    );