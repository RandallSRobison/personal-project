module.exports = {
  async getGroups(req, res) {
    const { id } = req.body;
    const db = req.app.get("db");
    let userGroups = await db.get_groups(id);
    if (!userGroups)
      return res.status(401).send("You dont have any groups! Create one!");
    if (userGroups) {
      req.session.user.groups = userGroups;
    }
  },

  async createGroup(req, res) {
    let { groupName, admin} = req.body;
    const db = req.app.get("db");
    let [newGroup] = await db.create_group([groupName, admin]);
    await db.join_group([newGroup.group_id, admin])
    res.send([newGroup]);
  },

  async deleteGroup(req, res) {
    let (groupId ) = req.params;
    const db = re.app.get("db");
    let groups = await db.delete_group([+groupId, req.session.user.id]);
    res.send(groups)
  },

//   async editGroup(req, res) {
//       let { groupId } = req.params;
//       let { groupName, goals, goalTitle, goalDescription, goalStatus} = req.body;
//       const db = req.app.get('db');
//       let groups = await db.edit_group()
//   }
};
