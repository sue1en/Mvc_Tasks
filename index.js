const express = require("express");
const path = require("path");
const passport = require("passport");
const session = require('express-session');
const cookieParser = require('cookie-parser');
require("dotenv").config();
require("./auth.passport")(passport);

const taskCtrl = require("./controllers/task.controller");
const userCtrl = require("./controllers/user.controller");
const autorizar = require("./utils/middleware.auth");
// const {autorizar} = require("./utils/middleware");

const indexRoute = require("./router/index.route")
const loginRoute = require("./router/login.route")

const app = express();
const port = process.env.PORT || 3005;

app.use(session({
    secret:"secret",
    resave:true,
    saveUninitialized:true,
    cookie: { maxAge:500000000 }
  }));
app.use(passport.initialize());
app.use(passport.session());
  
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "views")));

app.use("/login", loginRoute);
app.use("/", autorizar, indexRoute);
app.get("/users", autorizar, userCtrl.hendlerAllUsers);
app.post("/newuser", autorizar, userCtrl.hendlerNewUser)
app.get("/tasks", autorizar, taskCtrl.hendlerAllTasks)

app.delete("/tasks/:id", autorizar, taskCtrl.hendlerRemoveTask);
app.post("/newtask", autorizar, taskCtrl.hendlerNewTask)

app.post("/novoadm", autorizar, userCtrl.hendlerNewAdmin);
app.put("/tasks/:id", autorizar, taskCtrl.hendlerEditTask)

// app.get("/users/:id", userCtrl.hendlerUsersById)
// app.get("/tasks/:id", taskCtrl.hendlerTaskById)
// app.get("/tasklist", taskCtrl.hendlerTaskByUser)


app.listen(port, () => { console.log(`server is running at port http://localhost:${port}`)})
