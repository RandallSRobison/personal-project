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

- create table users (
-- user_id serial primary key,
-- first_name text,
-- last_name text,
-- email varchar unique,
-- username varchar unique,
-- password varchar
-- );

-- create table user_groups (
-- id serial primary key,
-- user_id integer,
-- group_id integer
-- );

-- create table groups (
-- group_id serial primary key,
-- group_name varchar,
-- admin_id integer
-- );

-- create table posts (
-- post_id serial primary key,
-- user_id integer,
-- group_id integer,
-- post_content varchar
-- );

-- create table group_goals (
-- id serial primary key,
-- goal_id integer,
-- group_id integer
-- );

-- create table goals (
-- goal_id serial primary key,
-- goal_description varchar,
-- goal_title varchar,
-- goal_status text
-- );

-- select * from users;

-- insert into groups (group_name, admin_id)
-- values ('Cooking', 3),
-- ('Sales', 2),
-- ('Sleeping', 1),
-- ('PLEASE', 4);

-- select * from groups;

-- insert into user_groups (user_id, group_id)
-- values (1, 3),
-- (1, 1),
-- (2, 2),
-- (4, 2);

-- select * from user_groups;
-- select * from users
-- where username = 'rsr';

-- SELECT u.*, array_agg(groups.group_name) AS groups
-- FROM groups JOIN user_groups ug ON (groups.group_id = ug.group_id)
-- JOIN users u ON (u.user_id = ug.user_id)
-- WHERE u.username = 'rsr'
-- -- GROUP BY u.user_id;

-- SELECT array_agg(goals.goal_title, goals.goal_description, goals.goal_status) as goals_info
-- from goals join group_goals on (group_goals.goal_id = goals.goal_id)
-- join groups on (groups.group_id = group_goals.group_id)
-- where goals.goal_id = 10
-- group by groups.group_id;

-- select *
-- from goals g join group_goals gg on (gg.goal_id = g.goal_id)
-- join groups on (groups.group_id = gg.group_id)

-- select g.*,
-- (select json_agg(i)
--     from (
--     select g.*
--     from goals g
--     join group_goals gg
--     on gg.goal_id = g.goal_id
--     ) as i
--     where i.group_id = groups.group_id
-- ) as goals
-- from groups g
-- where groups.group_id = 5;

-- select g.*,
-- (select json_agg(i)
--     from (
--     select gg.goal_id, gg.group_id
--     from group_goals as gg
--     join groups as s
--     on gg.group_id = s.group_id
--     ) as i
--     where i.goal_id = g.goal_id
-- ) as groups
-- from goals as g
-- where g.goal_id = 7;

-- select *,
-- (select json_agg(i)
--     from (
--     select go.*, gg.group_id
--     from goals go
--     join group_goals gg
--     on go.goal_id = gg.goal_id
--     ) as i
--     where i.group_id = groups.group_id
-- ) as goals
-- from groups
-- where groups.group_id = 5;

-- select g.*
-- FROM groups g
-- JOIN user_groups ug on (g.group_id = ug.group_id)
-- where ug.user_id = 1;

-- select json_agg(i)
--     from (
--     select go.*
--     from goals go
--     join group_goals gg
--     on go.goal_id = gg.goal_id
--     ) as i
--     where i.goal_id = go.goal_id


-- select go.*, gg.group_id
--     from goals go
--     join group_goals gg
--     on go.goal_id = gg.goal_id

-- select * from goals



-- select g.*, gl.*
-- FROM goals gl
-- JOIN group_goals gg on (gl.goal_id = gg.goal_id)
-- JOIN groups g on ( gg.group_id = g.group_id)
-- JOIN user_groups ug on (g.group_id = ug.group_id)
-- where ug.user_id = '2';

-- insert into groups (group_name, admin_id)
-- values ('Selling NYC', 2),
-- ('Sleeping', 1),
-- ('Cooking', 3),
-- ('Being Awesome', 4);

-- select * from groups;

-- insert into user_groups (user_id, group_id)
-- values (1, 6),
-- (4, 6),
-- (1, 5),
-- (2, 5),
-- (3, 7),
-- (4, 8);
-- select * from goals;

-- insert into goals (goal_title, goal_description, goal_status)
-- values ('Sell All Of NYC', 'We are going to sell all of it. All of it.', true),
-- ('Sell $75M', 'Sell $75M this month alone.', false),
-- ('Be Smartish', 'Do not be stupid.', true),
-- ('Cook All The Good Stuff', 'I am going to cook everything.', true),
-- ('Learn New Recipes', 'Learn 2 new recipes this month.', true);

-- -- select * from group_goals;
-- select * from goals; 
-- select * from groups;

-- insert into group_goals (group_id, goal_id)
-- values (5, 7),
-- (5, 8),
-- (7, 10),
-- (7, 11),
-- (6, 9);

-- delete from users
-- where user_id = 5;

-- update users 
-- set image = 'https://pbs.twimg.com/profile_images/2791763282/c69b80386cbd22cc9dc838587ed51d2d.jpeg'
-- where user_id = 4; 

-- select g.*, gl.*
-- FROM goals gl
-- JOIN group_goals gg on (gl.goal_id = gg.goal_id)
-- JOIN groups g on ( gg.group_id = g.group_id)
-- JOIN user_groups ug on (g.group_id = ug.group_id)
-- where ug.user_id = 3;

-- select * from users;

-- update users
-- set image = 'https://steamuserimages-a.akamaihd.net/ugc/830202845283684538/921D30088F2E67EE641A6DA92C399EE786568511/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
-- username = 'rsr'
-- where user_id = 1;

-- select * from group_goals;

-- select count(goals.goal_id) as goalQuantity 
-- from goals
-- join group_goals on (group_goals.goal_id = goals.goal_id)
-- join groups on (groups.group_id = group_goals.group_id)
-- where groups.group_id = $1;

-- select * from group_goals
-- where group_id = 5

-- select * from goals;

-- SELECT gl.*, g.group_name, g.group_id, g.admin_id
-- FROM goals gl
-- JOIN group_goals gg ON (gl.goal_id = gg.goal_id)
-- JOIN groups g ON (gg.group_id = g.group_id)
-- JOIN user_groups ug ON (g.group_id = ug.group_id)
-- JOIN users u ON (ug.user_id = u.user_id)
-- WHERE ug.user_id = $1
-- GROUP BY g.group_id, gl.goal_id
-- ORDER by g.group_id;


-- SELECT json_agg(gl.*) as goals_in_group, g.group_name, g.group_id, g.admin_id
-- FROM goals gl
-- JOIN group_goals gg ON (gl.goal_id = gg.goal_id)
-- JOIN groups g ON (gg.group_id = g.group_id)
-- JOIN user_groups ug ON (g.group_id = ug.group_id)
-- WHERE ug.user_id = 1
-- GROUP BY g.group_id
-- ORDER by g.group_id;

-- select json_agg(g.*, u.user_id, u.username) as stuff
-- FROM groups g
-- JOIN user_groups ug on (g.group_id = ug.group_id)
-- JOIN users u on (ug.user_id = u.user_id);

-- SELECT json_agg(u.*) as users_in_group, g.group_name, g.group_id, g.admin_id
-- FROM groups g
-- JOIN user_groups ug ON (g.group_id = ug.group_id)
-- join users u on (u.user_id = ug.user_id)
-- GROUP BY g.group_id
-- ORDER by g.group_id;

-- select * from groups

-- delete from groups
-- where group_id > 7


-- select u.*, array_agg(groups.group_name) as groups
-- FROM groups JOIN user_groups ug on (groups.group_id = ug.group_id)
-- join users u on (u.user_id = ug.user_id)
-- where u.username = 'rsr'
-- GROUP BY u.user_id;