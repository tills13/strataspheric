ALTER TABLE meetings
DROP COLUMN date;

ALTER TABLE meetings
ADD COLUMN eventId text not null default '00000000-0000-0000-0000-000000000000';

ALTER TABLE events
ADD COLUMN isPublic BOOLEAN DEFAULT TRUE;