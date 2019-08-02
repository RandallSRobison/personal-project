SELECT json_agg(u.*) as users_in_group, g.group_name, g.group_id, g.admin_id
FROM groups g
JOIN user_groups ug ON (g.group_id = ug.group_id)
join users u on (u.user_id = ug.user_id)
GROUP BY g.group_id
ORDER by g.group_id;