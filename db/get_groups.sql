select * from groups
where group_id = user_groups(group_id)
returning *;