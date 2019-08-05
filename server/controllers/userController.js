const bcrypt = require("bcryptjs");
const saltRounds = 12;

module.exports = {
  async login(req, res) {
    // console.log("hit login", req.body);
    let { username, password } = req.body;
    const db = req.app.get("db");
    let [existingUser] = await db.get_user(username);
    let groups = await db.get_user_groups(existingUser.user_id);
    // console.log(existingUser);
    if (!existingUser) return res.status(401).send("Username not found");
    let result = await bcrypt.compare(password, existingUser.password);
    if (result) {
      req.session.user = {
        username: existingUser.username,
        id: existingUser.user_id,
        image: existingUser.image,
        loggedIn: true,
        groups: groups
      };
      res.send(req.session.user);
    } else res.status(401).send("Username or password is incorrect.");
  },

  async register(req, res) {
    // console.log('hit register', req.body);
    let { firstName, lastName, email, username, password, image } = req.body;
    const db = req.app.get("db");
    let [existingUser] = await db.get_user(username);
    // console.log('existingUser', existingUser);
    if (existingUser) return res.status(400).send("Username taken.");
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(password, salt);
    // console.log('hit user');
    let [user] = await db.create_user([
      firstName,
      lastName,
      email,
      username,
      hash,
      image
    ]);
    // console.log(user);
    req.session.user = {
      firstName,
      lastName,
      email,
      username: user.username,
      id: user.user_id,
      image: user.image,
      loggedIn: true
    };
    // console.log('session user', req.session.user);
    res.send(req.session.user);
  },

  async editUser(req, res) {
    let { userId } = req.params;
    let { username, image } = req.body;
    const db = req.app.get("db");
    let [userInfo] = await db.edit_user_info([+userId, username, image]);
    let user = { ...userInfo, id: userInfo.user_id, loggedIn: true };
    res.send(user);
  },

  logout(req, res) {
    req.session.destroy();
    res.status(200).send("Your session was obliterated.");
  },

  async getUser(req, res) {
    const db = req.app.get("db");
    if (req.session.user.id) {
      let groups = await db.get_user_groups(req.session.user.id);
      req.session.user = { ...req.session.user, groups };
    }
    res.send(req.session.user);
  }
};
