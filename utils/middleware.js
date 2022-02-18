const jwt = require('jsonwebtoken');

require("dotenv").config();

const autorizar = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.status(403).send({
      message: "Usuário não autorizado."
    });
  };
  
  jwt.verify(token, process.env.JWT_KEY, (error, decoded) => {
    if(error) return res.status(401).send({message: "usuário não autenticado!"});

    req.userId = decoded.id;
  });

  return next();
};
  
module.exports = autorizar;