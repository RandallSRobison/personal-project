module.exports = {
  async getGoals(req, res) {
    let { groupId } = req.params;
    const db = req.app.get("db");
    let goals = await db.get_goals_by_group(groupId);
    if (!goals[0]) {
      return res.status(401).send("No goals for this group detected.");
    }
    res.status(200).send(goals);
  },

  // async editGoal(req, res) {
  //   let { goalId } = req.params;
  //   let { newDesc, newTitle, groupId } = req.body;
  //   const db = req.app.get("db");
  //   let newGoal = await db.edit_goal([+goalId, newDesc, newTitle, groupId]);
  //   res.send(newGoal);
  // },

  async addGoal(req, res) {
    console.log("params", req.params, "body", req.body);
    let { groupId } = req.params;
    let { goalTitle, goalDescription } = req.body;
    const db = req.app.get("db");
    let [newGoal] = await db.add_goal(goalTitle, goalDescription);
    await db.add_goal_to_group(newGoal.goal_id, groupId)
    let goals = await db.get_goals_by_group(groupId);
    res.status(200).send(goals);
  },

  async changeStatus(req, res) {
    let { goalId } = req.params;
    let { goalStatus } = req.body;
    const db = req.app.get("db");
    let status = await db.swap_goal_status(goalId, goalStatus)
    res.status(200).send(status)
  },

  async deleteGoal(req, res) {
    console.log('dis da shiz', req.params, req.query)
    let {groupId} = req.params;
    let { goalId} = req.query;
    const db = req.app.get("db");
    const deletedGoal = await db.delete_goal(+goalId);
    console.log("controller", deletedGoal);
    let goals = await db.get_goals_by_group(+groupId);
    console.log(goals)
    res.status(200).send(goals);
  },

  async getGoalsByUser(req, res) {
    let { userId } = req.params;
    const db = req.app.get("db");
    console.log("this is userId", req.params);
    let userGoals = await db.get_goals_by_user(userId);
    console.log("this is user goals :", userGoals);
    if (!userGoals[0]) {
      return res.status(401).send("No goals for this user detected.");
    }
    res.status(200).send([userGoals]);
  }
};
