const { tasks, users } = require('../models');
const { v4:uuidv4 } = require("uuid")

const allTasks = async () => {
  const resultFromDB = await tasks.findAll({
  });
  const mapTasks = resultFromDB?.map(item => {
    return item.dataValues
  });

  return mapTasks;
};
const createNewTask = async (body, user_id) => {
  return await tasks.create({
    id:uuidv4(),
    title: body.title,
    // user_id:user_id
    user_id:"0d3cd7f2-187d-4813-803d-8f9761bd2175"
  });
};

const TasksByUser = async ( user_id) => {
  const resultFromDB = await tasks.findAll({
    where:{
      user_id:user_id
    },
    include: [{
      model: users,
      as: 'userTask',
    }]
  });
  return resultFromDB;
}

const taskById = async (id) => {
  const resultFromDB = await tasks.findOne({
    where: { id: id }
  });
  return resultFromDB;
};

const editTask = async (body, id) => {
    return await tasks.update(
    {title: body.title},
    {where: { id:id }}
  );
};

const deleteTask = async (id) => {
  return await tasks.destroy({
    where: { id:id }
  });
};

module.exports = {
  createNewTask,
  TasksByUser,
  editTask,
  deleteTask,
  allTasks,
  taskById
};