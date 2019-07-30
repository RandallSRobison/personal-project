select g.*
FROM groups g
JOIN user_groups ug on (g.group_id = ug.group_id)
where ug.user_id = $1;