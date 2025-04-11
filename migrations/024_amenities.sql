CREATE TABLE
    amenities (
        id text not null,
        strataId text not null,
        name text not null,
        description text not null,
        status text,
        costPerHour float,
        imageFileId text not null        
    );

CREATE TABLE 
    amenity_bookings (
        id text not null,
        amenityId text not null,
        eventId text not null,
        approverId text,
        invoiceId text
    );

ALTER TABLE inbox_messages
ADD COLUMN amenityBookingId text;

ALTER TABLE invoices
ADD COLUMN status text;