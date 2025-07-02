ALTER TABLE stratas
ADD COLUMN stripeCustomerId TEXT;

ALTER TABLE strata_plans
ADD COLUMN enableAmenities BOOLEAN;

ALTER TABLE strata_plans
ADD COLUMN enableDirectory BOOLEAN;

ALTER TABLE strata_plans
ADD COLUMN enableInvoices BOOLEAN;

ALTER TABLE strata_plans
ADD COLUMN enableEmailNotifications BOOLEAN;

ALTER TABLE strata_plans
ADD COLUMN enableMeetings BOOLEAN;

ALTER TABLE strata_plans
ADD COLUMN subscriptionId TEXT;