module.exports = {
  async getGoals(req, res) {
    let { groupId } = req.params;
    const db = req.app.get("db");
    let goals = await db.get_goals_by_group(groupId);
    if (!goals[0]) {
      return res.status(401).send("No goals for this group detected.")};
    res.status(200).send(goals);
  },

  async createGoal(req, res) {
    let { groupId } = req.params;
    const db = req.app.get("db");
    const { goalDesc, goalTitle } = req.body;
    const createdGoal = await db.create_goal([+groupId, goalDesc, goalTitle]);
    res.send(createdGoal);
  },

  async editGoal(req, res) {
    let { goalId } = req.params;
    let { newDesc, newTitle, groupId } = req.body;
    const db = req.app.get("db");
    let newGoal = await db.edit_goal([+goalId, newDesc, newTitle, groupId]);
    res.send(newGoal);
  }
};
