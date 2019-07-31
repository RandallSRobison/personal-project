create table users (
user_id serial primary key,
first_name text,
last_name text,
email varchar unique,
username varchar unique,
password varchar,
image varchar
);

create table user_groups (
id serial primary key,
user_id integer,
group_id integer
);

create table groups (
group_id serial primary key,
group_name varchar,
admin_id integer
);

create table posts (
post_id serial primary key,
user_id integer,
group_id integer,
post_content varchar
);

create table group_goals (
id serial primary key,
goal_id integer,
group_id integer
);

create table goals (
goal_id serial primary key,
goal_description varchar,
goal_title varchar,
goal_status text
);