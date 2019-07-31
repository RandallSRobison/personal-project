insert into groups (group_name, admin_id)
values ('Cooking', 3),
('Sales', 2),
('Sleeping', 1),
('PLEASE', 4);

insert into user_groups (user_id, group_id)
values (1, 3),
(1, 1),
(2, 2),
(4, 2);