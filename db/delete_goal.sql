delete from goals
where goal_id = $1

returning *;