update goals
set goal_status = not goal_status
where goal_id = $1

returning *;