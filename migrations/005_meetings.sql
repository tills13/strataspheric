CREATE TABLE
    meetings (
        id text primary key,
        strataId text,
        purpose text,
        notes text,
        date datetime not null
    );

CREATE TABLE
    meeting_agenda_items (
        id text primary key,
        meetingId text not null,
        title text not null,
        description text,
        eventId text,
        fileId text,
        messageId text,
        chatId text,
        done boolean default FALSE
    );

CREATE TABLE
    meeting_files (
        meetingId text,
        fileId text,
        primary key (meetingId, fileId)
    );