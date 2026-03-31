ALTER TABLE meeting_agenda_items ADD COLUMN type TEXT NOT NULL DEFAULT 'item';

CREATE TABLE meeting_agenda_item_votes (
  agendaItemId TEXT NOT NULL,
  userId TEXT NOT NULL,
  vote TEXT NOT NULL CHECK (vote IN ('for', 'against', 'abstain')),
  PRIMARY KEY (agendaItemId, userId),
  FOREIGN KEY (agendaItemId) REFERENCES meeting_agenda_items (id),
  FOREIGN KEY (userId) REFERENCES users (id)
);
