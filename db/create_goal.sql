insert into goals (goal_description, goal_title)
values ($2, $3);

select * from goals;
join group_goals on (group_goals.goal_id = goals.goal_id)
where group_id = $1