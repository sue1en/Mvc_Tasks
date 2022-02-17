const express = require("express");
// const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require("path");
require("dotenv").config();

const taskCtrl = require("./controllers/task.controller");
const userCtrl = require("./controllers/user.controller");
const authCtrl = require("./controllers/auth.controller");
const autorizar = require("./utils/middlewares");

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 3005;

// app.use(session({
//   secret:"secret",
//   resave:true,
//   saveUninitialized:true
// }));

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("index")
})

//CRIA NOVO ADM rodar apenas uma vez
app.post("/novoadm", userCtrl.hendlerNewAdmin)

app.post("/login", userCtrl.hendlerAuth)

app.get("/users", autorizar, userCtrl.hendlerAllUsers)
app.get("/users/:id", userCtrl.hendlerUsersById)
app.post("/newuser", autorizar, userCtrl.hendlerNewUser)

app.get("/tasks", autorizar, taskCtrl.hendlerAllTasks)
app.get("/tasks/:id", autorizar, taskCtrl.hendlerTaskById)
app.put("/tasks/:id", autorizar, taskCtrl.hendlerEditTask)
app.delete("/tasks/:id", autorizar, taskCtrl.hendlerRemoveTask)
app.get("/tasklist", autorizar, taskCtrl.hendlerTaskByUser)
app.post("/newtask", autorizar, taskCtrl.hendlerNewTask)


app.listen(port, () => { console.log(`server is running at port http://localhost:${port}`)})
