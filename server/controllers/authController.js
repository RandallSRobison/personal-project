const bcrypt = require("bcryptjs");
const saltRounds = 12;

module.exports = {
  async login(req, res) {
    // console.log("hit login", req.body);
    let { username, password } = req.body;
    const db = req.app.get("db");
    let [existingUser] = await db.get_user(username);
    let groups = await db.get_user_groups(existingUser.id);
    // console.log(existingUser);
    if (!existingUser) return res.status(401).send("Username not found");
    let result = await bcrypt.compare(password, existingUser.password);
    if (result) {
      req.session.user = {
        username: existingUser.username,
        id: existingUser.id,
        loggedIn: true,
        groups: groups
      };
      res.send(req.session.user);
    } else res.status(401).send("Username or password is incorrect.");
  },

  async register(req, res) {
    // console.log('hit register', req.body);
    let { firstName, lastName, email, username, password } = req.body;
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
      hash
    ]);
    // console.log(user);
    req.session.user = {
      firstName,
      lastName,
      email,
      username: user.username,
      id: user.user_id,
      loggedIn: true
    };
    // console.log('session user', req.session.user);
    res.send(req.session.user);
  },

  logout(req, res) {
    console.log("hit logout");
    req.session.destroy();
    console.log("req.session", req.session);
    res.status(200).send("Your session was obliterated.");
  },

  getUser(req, res) {
    res.send(req.session.user);
  }
};
