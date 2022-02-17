const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

// exports.autorizar = () => {
//   return (req, res, next) => {
//     const token = req.headers

//     console.log("###TOKEN###", token)
//     if (!token) {
//       return res.status(403).send({
//         message: "usuário não autorizado."
//       });
//     };
//     try{
//       const userJWT = jwt.verify(token, process.env.JWT_KEY);
//       req.user = userJWT;
      
//     } catch (error) {
//       return res.status(401).send({message: "usuário não autenticado!"});
//     };

//     next();
//   };
// };


const autorizar = (req, res, next) => {
  const token = req.headers.cookie

  console.log("###TOKEN###", token)
  if (!token) {
    return res.status(403).send({
      message: "usuário não autorizado."
    });
  };
  try{
    const userJWT = jwt.verify(token, process.env.JWT_KEY);
    req.user = userJWT;
    
  } catch (error) {
    return res.status(401).send({message: "usuário não autenticado!"});
  };

  return next();
};
  
  module.exports = autorizar;