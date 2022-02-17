const userService = require("../services/user.service")

const hendlerAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.userValidate(email, password);
    if (!result) {
      return res.status(400).send({message: `usuário ou senha inválidos.`});
    }; 
    var userCredential = await userService.createCredential(email);
    // console.log("###CTRL###", userCredential)
      return res.status(200).send(userCredential)
  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  };
};

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
    if (user.type !== "1") {
      return res.status(400).send({message: 'Usuário não autorizado!'});
    }
    if (await userService.findEmail(body.email)){
      return res.status(400).send({message: 'Email já cadastrado.'});
    };
    await userService.createUser(body);
    return res.status(200).send({message:"Novo usuário criado com sucesso!", data:body});
 } catch (error) {
    console.log(error);
    res.status(500).send({message:"error"});
 };
};

const hendlerAllUsers = async (req, res, next) => {
  try{
    const user = req
    console.log("###2###", user)
    // if (user.type !== "1") {
    //   return res.status(400).send({message: 'Usuário não autorizado!'});
    // }
    const result = await userService.allUsers();
    return res.status(200).send(result);
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
  hendlerAuth,
  hendlerNewAdmin
}