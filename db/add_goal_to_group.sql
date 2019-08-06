insert into group_goals (goal_id, group_id)
values($1, $2)

-- select * from goals
-- join group_goals on (group_goals.goal_id = goals.goal_id)
-- where group_id = $1;