ALTER TABLE files
ADD COLUMN uploaderId text;

ALTER TABLE events
ADD COLUMN creatorId text;

ALTER TABLE meetings
ADD COLUMN callerId text;

ALTER TABLE events
ADD COLUMN strataId text;