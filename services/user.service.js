const md5 = require("md5");
const { users, tasks } = require("../models");
const { v4:uuidv4 } = require("uuid")

const createHash = (password) => {
  return md5(password)
};

const findEmail = async (email) => {
  return await users.findOne({ where:{email:email}}) ? true : false ;
};

const isEmailRegistered = async (email) => {
  const userFromDb = await users.findOne({
    where:{
      email:email
    }
  });
  return userFromDb
};

const userValidate = async (email, password) => {
  return await users.findOne({ where:{email, password:createHash(password)}}) ? true : false;
};

const createUser = (body) => {
  const registerModel = {
    id: uuidv4(),
    name: body.name,
    email: body.email,
    type:'2',
    password: createHash(body.password),
  };
  return users.create(registerModel);
};

const allUsers = async () => {
  const resultFromDB = await users.findAll({});
  return resultFromDB;
};

const userById = async (user_id) => {
  const resultFromDB = await users.findOne({
    where: { id: user_id },
    include: [{
      model: tasks,
      as: 'userTask',
    }],
  });
  const { id, name, email, userTask: task } = resultFromDB

  return {
    id,
    name,
    email,
  }
};

const createAdmin = async () => {
  const registerModel = {
    id: uuidv4(),
    name: "admin",
    email: "admin@email.com",
    type:'1',
    password: createHash("123"),
  };
  return await users.create(registerModel);
};


module.exports={
  isEmailRegistered,
  userValidate,
  createUser,
  allUsers,
  findEmail,
  userById,
  createAdmin
}