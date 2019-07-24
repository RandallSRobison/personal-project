insert into groups(group_name, admin_id)
values ($1, $2)
returning *;