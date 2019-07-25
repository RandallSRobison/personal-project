select g.*, gl.*
FROM goals gl
JOIN group_goals gg on (gl.goal_id = gg.goal_id)
JOIN groups g on ( gg.group_id = g.group_id)
JOIN user_groups ug on (g.group_id = ug.group_id)
where ug.user_id = $1;

--OR

-- select u.*, array_agg(groups.group_name) as groups
-- FROM groups JOIN user_groups ug on (groups.group_id = ug.group_id)
-- join users u on (u.user_id = ug.user_id)
-- where u.username = 'rsr'
-- GROUP BY u.user_id;

