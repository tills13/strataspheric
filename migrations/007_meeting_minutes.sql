CREATE TABLE
    meeting_minutes (
        meetingId text,
        fileId text,
        state text default 'draft',
        primary key (meetingId, fileId)
    );