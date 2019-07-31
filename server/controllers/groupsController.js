module.exports = {
  async getGroups(req, res) {
    const { id } = req.body;
    const db = req.app.get("db");
    let userGroups = await db.get_groups(id);
    if (!userGroups)
      return res.status(401).send("No groups detected.");
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
    let {groupId } = req.params;
    const db = re.app.get("db");
    let groups = await db.delete_group([+groupId, req.session.user.id]);
    res.send(groups)
  },

  logout(req, res) {
    req.session.destroy();
    res.status(200).send("Your session was obliterated.");
  },
};
