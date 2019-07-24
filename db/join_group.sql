insert into user_groups (group_id, user_id)
values ($1, $2)
returning *;