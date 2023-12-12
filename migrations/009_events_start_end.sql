ALTER TABLE events
ADD COLUMN startDate text NOT NULL DEFAULT '';

ALTER TABLE events
ADD COLUMN endDate text NOT NULL DEFAULT '';

UPDATE events
SET
    startDate = date,
    endDate = date;

ALTER TABLE events
DROP COLUMN date;