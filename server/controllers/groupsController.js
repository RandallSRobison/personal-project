module.exports = {
  // async getGroups(req, res) {
  //   const { id } = req.body;
  //   const db = req.app.get("db");
  //   let userGroups = await db.get_groups(id);
  //   if (!userGroups) return res.status(401).send("No groups detected.");
  //   if (userGroups) {
  //     req.session.user.groups = userGroups;
  //   }
  // },

  async getAllGroups(req, res) {
    const db = req.app.get("db");
    let allGroups = await db.get_all_groups();
    allGroups.forEach(item =>
      item.users_in_group.forEach(user => (user.password = undefined))
    );
    allGroups.forEach(item => console.log(item));
    if (!allGroups) return res.status(401).send("No groups detected.");
    res.send(allGroups);
  },

  async createGroup(req, res, next) {
    let { groupName, admin } = req.body;
    const db = req.app.get("db");
    let [newGroup] = await db.create_group([groupName, admin]);
    await db.join_group([newGroup.group_id, admin]);
    let groups = await db.get_user_groups(req.session.user.id);
    req.session.user.groups = groups;
    // next()
  },

  async joinGroup(req, res) {
    let { groupId, userId } = req.body;
    const db = req.app.get("db");
    let joinedGroup = await db.join_group(groupId, userId);
    // if (joinedGroup.length > 0) {
      let groups = await db.get_all_groups();
    res.send(groups);
    // } else res.status(401).send("There was a problem.");
  },

  async deleteGroup(req, res, next) {
    let { groupId } = req.params;
    const db = req.app.get("db");
    let deletedGroups = await db.delete_group(groupId);
    next();
  },

  logout(req, res) {
    req.session.destroy();
    res.status(200).send("Your session was obliterated.");
  }
};
