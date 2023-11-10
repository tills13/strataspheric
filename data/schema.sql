DROP TABLE IF EXISTS stratas;
CREATE TABLE IF NOT EXISTS stratas (
    id text primary key, 
    name text, 
    domain text,
    visibility text
);

INSERT INTO stratas VALUES ("018bb101-dc78-761b-ba86-2f4914bfd820", "Test Strata", "127.0.0.1:8788", "public");
INSERT INTO stratas VALUES ("018bb5a2-f3d5-7156-8e8f-a37ff69c1996", "Test Strata 2", "localhost:3000", "public");

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
    email text,
    password text
);

INSERT INTO members VALUES ("018bb102-52c1-792d-b951-de3d36ba1208", "tills13@gmail.com", "password");
INSERT INTO members VALUES ("018bb104-076f-7883-9928-359fb3789741", "tills13+2@gmail.com","password");

DROP TABLE IF EXISTS strata_memberships;
CREATE TABLE IF NOT EXISTS strata_memberships (
    strata_id text,
    member_id text,
    unit text,
    role text,
    name text,
    email text,
    phone_number text,
    primary key (strata_id, member_id)
);

INSERT INTO strata_memberships VALUES ("018bb101-dc78-761b-ba86-2f4914bfd820", "018bb102-52c1-792d-b951-de3d36ba1208", "1", "president", "Tyler Sebastian", "test@test.com", "778-767-4774");
INSERT INTO strata_memberships VALUES ("018bb101-dc78-761b-ba86-2f4914bfd820", "018bb104-076f-7883-9928-359fb3789741", "2", "owner", "Test User", "test2@test.com", "778-767-4774");

INSERT INTO strata_memberships VALUES ("018bb5a2-f3d5-7156-8e8f-a37ff69c1996", "018bb102-52c1-792d-b951-de3d36ba1208", "1", "president", "Tyler Sebastian", "test@test.com", "778-767-4774");
