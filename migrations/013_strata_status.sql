alter table stratas
add column status text not null default 'pending';

alter table stratas
add column strataActiveEmailSent boolean default FALSE;

alter table stratas
add column city text;