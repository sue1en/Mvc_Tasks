const express = require("express");

const path = require("path");

require("dotenv").config();

const taskCtrl = require("./controllers/task.controller");
const userCtrl = require("./controllers/user.controller");
const {autorizar} = require("./utils/middlewares");

const app = express();
const port = process.env.PORT || 3005;

app.set("view engine", "ejs");
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.render("index")
})
app.post("/login", userCtrl.hendlerAuth)

app.get("/users", autorizar(), userCtrl.hendlerAllUsers)
app.get("/users/:id", userCtrl.hendlerUsersById)
app.post("/newuser", autorizar(), userCtrl.hendlerNewUser)

app.get("/tasks", autorizar(), taskCtrl.hendlerAllTasks)
app.get("/tasks/:id", autorizar(), taskCtrl.hendlerTaskById)
app.put("/tasks/:id", autorizar(), taskCtrl.hendlerEditTask)
app.delete("/tasks/:id", autorizar(), taskCtrl.hendlerRemoveTask)
app.get("/tasklist", autorizar(), taskCtrl.hendlerTaskByUser)
app.post("/newtask", autorizar(), taskCtrl.hendlerNewTask)


app.listen(port, () => { console.log(`server is running at port http://localhost:${port}`)})
