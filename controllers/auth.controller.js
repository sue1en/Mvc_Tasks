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

module.exports={
  hendlerAuth,
}