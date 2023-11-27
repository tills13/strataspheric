alter table users
add column name text;

alter table users
add column accountType text default 'user';