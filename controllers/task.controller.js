const taskService = require("../services/task.service")

const hendlerNewTask = async (req, res, next) => {
  try{
    const body  = req.body;
    const userId  = req.user.id;
    await taskService.createNewTask(body, userId);
    return res.status(200).send("sucesso!!");
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"erro!!!"});
 };
};

const hendlerTaskByUser = async (req, res, next) => {
  try{
    const userId  = req.user.id;
    const result = await taskService.TasksByUser(userId);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  }
};

const hendlerAllTasks = async (req, res, next) => {
  try{
    const {user} = req
    if (user.type !== "1") {
      return res.status(400).send({message: 'Usuário não autorizado!'});
    }
    const result = await taskService.allTasks();
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  }
};

const hendlerTaskById = async (req, res, next) => {
  try {
    const {user} = req
    const taskResult = await taskService.taskById(req.params.id);
    if (user.dataValues.id !== taskResult.dataValues.user_id) {
      return res.status(400).send({message: 'Usuário não autorizado!'});
    }
    return res.status(200).send(taskResult);
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  };
};

const hendlerEditTask = async (req, res, next) => {
  try {
    const {user, body} = req
    const task_id = req.params.id
    var taskResult = await taskService.taskById(task_id);
   console.log("######", task_id)
    if (user.dataValues.id !== taskResult.dataValues.user_id) {
      return res.status(400).send({message: 'Usuário não autorizado!'});
    }
    await taskService.editTask(body, task_id);
    return res.status(200).send({message:"Editado com sucesso!"});
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  };
};

const hendlerRemoveTask = async (req, res, next) => {
  try {
    const {user} = req
    const task_id = req.params.id
    var taskResult = await taskService.taskById(task_id);
    if (user.dataValues.id !== taskResult.dataValues.user_id) {
      return res.status(400).send({message: 'Usuário não autorizado!'});
    }
    await taskService.deleteTask(task_id);
    return res.status(200).send({message:"Removido com sucesso!"});
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  };
}


module.exports = {
  hendlerNewTask,
  hendlerAllTasks,
  hendlerTaskById,
  hendlerEditTask,
  hendlerRemoveTask,
  hendlerTaskByUser
}