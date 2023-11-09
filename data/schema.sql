DROP TABLE IF EXISTS stratas;
CREATE TABLE IF NOT EXISTS stratas (
    id text primary key, 
    name text, 
    domain text
);

INSERT INTO stratas VALUES ("018bb101-dc78-761b-ba86-2f4914bfd820", "Test Strata", "127.0.0.1:8788");

DROP TABLE IF EXISTS strata_widgets;
CREATE TABLE IF NOT EXISTS strata_widgets (
    id text primary key, 
    strata_id text, 
    type text, 
    title text
);

DROP TABLE IF EXISTS files;
CREATE TABLE IF NOT EXISTS files (
    id text primary key,
    widget_id text,
    name text,
    description text,
    path text, 
    created_at text
);

DROP TABLE IF EXISTS events;
CREATE TABLE IF NOT EXISTS events (
    id text primary key,
    widget_id text,
    name text,
    description text,
    date text
);

DROP TABLE IF EXISTS members;
CREATE TABLE IF NOT EXISTS members (
    id text primary key,
    name text,
    email text,
    phone_number text,
    password text
);

INSERT INTO members VALUES ("018bb102-52c1-792d-b951-de3d36ba1208", "Tyler Sebastian", "tills13@gmail.com", "778-767-4774", "password");
INSERT INTO members VALUES ("018bb104-076f-7883-9928-359fb3789741", "Test User 2", "tills13+2@gmail.com", "778-767-4774", "password");

DROP TABLE IF EXISTS strata_membership;
CREATE TABLE IF NOT EXISTS strata_membership (
    strata_id text,
    member_id text,
    unit text,
    role text,
    primary key (strata_id, member_id)
);

INSERT INTO strata_membership VALUES ("018bb101-dc78-761b-ba86-2f4914bfd820", "018bb102-52c1-792d-b951-de3d36ba1208", "1", "president");
INSERT INTO strata_membership VALUES ("018bb101-dc78-761b-ba86-2f4914bfd820", "018bb104-076f-7883-9928-359fb3789741", "2", "owner");

