delete from groups
where group_id = $1
returning *;