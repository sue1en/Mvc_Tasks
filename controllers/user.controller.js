const userService = require("../services/user.service")

const hendlerNewAdmin = async (req, res, next) => {
  try{
    await userService.createAdmin();
    return res.status(200).send({message:"Novo usuário criado com sucesso!"});
 } catch (error) {
    console.log(error);
    res.status(500).send({message:"error"});
 };
};

const hendlerNewUser = async (req, res, next) => {
  try{
    const {user, body} = req
    // if (user.type !== "1") {
    //   return res.status(400).send({message: 'Usuário não autorizado!'});
    // }
    if (await userService.findEmail(body.email)){
      return res.status(400).send({message: 'Email já cadastrado.'});
    };
    await userService.createUser(body);
    const userReload = await userService.allUsers()
    return res.status(200).render("users", {message:"Novo usuário criado com sucesso!", user:userReload});
 } catch (error) {
    console.log(error);
    res.status(500).send({message:"error"});
 };
};

const hendlerAllUsers = async (req, res, next) => {
  try{
    // const user = req
    // console.log("###2###", user)
    // if (user.type !== "1") {
    //   return res.status(400).send({message: 'Usuário não autorizado!'});
    // }
    const user = await userService.allUsers();
    return res.status(200).render("users", {user:user});
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  }
};

const hendlerUsersById = async (req, res, next) => {
  try {
    const result = await userService.userById(req.params.id);
    return res.status(200).send(result);
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  };
};

module.exports={
  hendlerNewUser,
  hendlerAllUsers,
  hendlerUsersById,
  hendlerNewAdmin
}