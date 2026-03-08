ALTER TABLE stratas ADD COLUMN stripeAccountId TEXT;
ALTER TABLE stratas ADD COLUMN stripeAccountStatus TEXT DEFAULT 'none';
ALTER TABLE invoices ADD COLUMN stripeInvoiceId TEXT;
ALTER TABLE invoices ADD COLUMN stripeInvoiceUrl TEXT;
ALTER TABLE invoices ADD COLUMN payerEmail TEXT;
