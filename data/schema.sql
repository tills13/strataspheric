DROP TABLE IF EXISTS stratas;

CREATE TABLE
    IF NOT EXISTS stratas (
        id text primary key,
        name text,
        domain text,
        num_units integer,
        strata_id text,
        street_address text,
        postal_code text,
        province_state text,
        is_public boolean
    );

DROP TABLE IF EXISTS strata_plans;

CREATE TABLE
    IF NOT EXISTS strata_plans (
        id text primary key,
        strata_id text,
        num_seats integer
    );

DROP TABLE IF EXISTS strata_widgets;

CREATE TABLE
    IF NOT EXISTS strata_widgets (
        id text primary key,
        strata_id text,
        type text,
        title text
    );

DROP TABLE IF EXISTS files;

CREATE TABLE
    IF NOT EXISTS files (
        id text primary key,
        widget_id text,
        name text,
        description text,
        path text,
        created_at text
    );

DROP TABLE IF EXISTS events;

CREATE TABLE
    IF NOT EXISTS events (
        id text primary key,
        widget_id text,
        name text,
        description text,
        date text
    );

DROP TABLE IF EXISTS members;

CREATE TABLE
    IF NOT EXISTS members (id text primary key, email text, password text);

DROP TABLE IF EXISTS strata_memberships;

CREATE TABLE
    IF NOT EXISTS strata_memberships (
        strata_id text,
        member_id text,
        unit text,
        role text,
        name text,
        email text,
        phone_number text,
        is_paid boolean,
        primary key (strata_id, member_id)
    );