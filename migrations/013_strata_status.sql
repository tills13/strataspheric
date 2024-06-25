ALTER TABLE stratas
ADD COLUMN status text NOT NULL DEFAULT 'pending';

ALTER TABLE stratas
ADD COLUMN strataActiveEmailSent boolean DEFAULT FALSE;

ALTER TABLE stratas
ADD COLUMN city text;