require("dotenv").config();
const express = require("express");
const session = require("express-session");
const massive = require("massive");
const ac = require("./controllers/authController");
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
app.post("/api/login", ac.login);
app.post("/api/register", ac.register);
app.get("/api/user", ac.getUser);
app.delete("/api/logout", ac.logout);

app.listen(SERVER_PORT, () => {
  console.log(`Cruisin' for a bruisin' on port ${SERVER_PORT}`);
});
