update goals
set goal_description = $2, goal_title = $3
where goal_id = $1;

select * from goals g
join group_goals gg on (gg.goal_id = g.goal_id)
where group_id = $4;