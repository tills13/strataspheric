ALTER TABLE invoices
ADD COLUMN updatedAt INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'));
