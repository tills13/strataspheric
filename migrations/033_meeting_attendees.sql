CREATE TABLE meeting_attendees (
    meetingId TEXT NOT NULL,
    userId TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'invited',
    respondedAt INTEGER,
    PRIMARY KEY (meetingId, userId),
    FOREIGN KEY (meetingId) REFERENCES meetings(id) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
);
