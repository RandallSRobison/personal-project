select *,
(select json_agg(i)
    from (
    select go.*, gg.group_id
    from goals go
    join group_goals gg
    on go.goal_id = gg.goal_id
    ) as i
    where i.group_id = groups.group_id
) as goals
from groups
where groups.group_id = $1;