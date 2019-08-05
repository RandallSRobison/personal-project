require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const sc = require("./controllers/stripeController")
const uc = require("./controllers/userController");
const gc = require("./controllers/groupsController");
const glc = require("./controllers/goalsController");
const { SERVER_PORT, SESSION_SECRET, CONNECTION_STRING } = process.env;

const app = express();
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

massive(CONNECTION_STRING).then(db => {
  app.set("db", db);
});

//user endpoints
app.post("/api/login", uc.login);
app.post("/api/register", uc.register);
app.get("/api/user", uc.getUser);
app.delete("/api/logout", uc.logout);
app.put("/api/edit/user/:userId", uc.editUser);

//group endpoints
app.get("/api/groups/:userId", gc.getGroups);
app.get("/api/allgroups", gc.getAllGroups);
app.post("/api/form", gc.createGroup, gc.getAllGroups);
app.delete(`/api/groups/:groupId`, gc.deleteGroup, gc.getAllGroups);
app.delete("/api/logout/groups", gc.logout);

//goal endpoints
app.put(`/api/edit/goals/:goalId`, glc.editGoal);
app.get("/api/goals/:groupId", glc.getGoals);
app.get("/api/usergoals/:userId", glc.getGoalsByUser);

//stripe endpoints
app.post("/api/payment", sc.pay)

app.listen(SERVER_PORT, () => {
  console.log(`Cruisin' for a bruisin' on port ${SERVER_PORT}`);
});
