SELECT gl.*, g.group_name, g.group_id, g.admin_id
FROM goals gl
JOIN group_goals gg ON (gl.goal_id = gg.goal_id)
JOIN groups g ON (gg.group_id = g.group_id)
JOIN user_groups ug ON (g.group_id = ug.group_id)
JOIN users u ON (ug.user_id = u.user_id)
WHERE ug.user_id = $1
GROUP BY g.group_id, gl.goal_id
ORDER by g.group_id;

-- select gl.*, g.group_name, g.group_id, g.admin_id
-- from goals gl
-- join group_goals gg on (gl.goal_id = gg.goal_id)
-- join groups g on (gg.group_id = g.group_id)
-- join user_groups ug on (g.group_id = ug.group_id)
-- join users u on (ug.user_id = u.user_id)
-- where ug.user_id = $1;