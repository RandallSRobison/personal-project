require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
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
app.post("/api/groups", gc.createGroup);
app.delete("/api/groups", gc.deleteGroup);
app.delete("/api/logout/groups", gc.logout);

//goal endpoints
app.put(`/api/edit/goals/:goalId`, glc.editGoal);
app.get("/api/goals/:groupId", glc.getGoals);

app.listen(SERVER_PORT, () => {
  console.log(`Cruisin' for a bruisin' on port ${SERVER_PORT}`);
});
