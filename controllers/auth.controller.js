const jwt = require("jsonwebtoken");
const HashSecret = process.env.JWT_SECRET;
const validTime = process.env.JWT_VALID_TIME;
const { users } = require("../models");
const userService = require("../services/user.service");


const hendlerAuth = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.userValidate(email, password);

    if (!result) {
      return res.status(400).send({message: `usuário ou senha inválidos.`});
    }; 
    const user = await users.findOne({
      where: {email},
      attributes: ["id", "email", "name", "type"]
    });
    
    const token = jwt.sign(
      {id:user.id},
      HashSecret,
      {expiresIn:`${validTime}ms`}
    )
      
    return res.status(200).send({user, token});

  } catch (error) {
    console.log(error);
    res.status(500).send({message:"error!"});
  };
};

module.exports={
  hendlerAuth,
}