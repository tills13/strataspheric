CREATE TABLE
    invoices (
        id text not null,
        strataId text not null,
        type text not null,
        identifier text not null,
        description text,
        amount float,
        fileId text,
        isPaid boolean default false,
        dueBy integer,
        createdAt integer INTEGER NOT NULL DEFAULT (strftime ('%s', 'now')),
        updatedAt integer INTEGER NOT NULL DEFAULT (strftime ('%s', 'now'))
    );

ALTER TABLE inbox_messages
ADD COLUMN invoiceId text;
