const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

exports.autorizar = (r = '*') => {
  return async (req, res, next) => {
    const { token } = req.headers;
    try{
      if (!token) {
        return res.status(403).send({
          message: "usuário não autorizado."
        });
      };

      const userJWT = jwt.verify(token, process.env.JWT_KEY);
      const user = await userService.isEmailRegistered(userJWT.email);
      req.user = user;

      if (r !== '*'){
        if(!profiles[user.type].includes(r))
        {
          return res.status(403).send({
          message: "Usuário não autorizado."
          });
        };
      };
      next();

    } catch (error) {
      res.status(401).send({
        message: "usuário não autenticado!"
      });
    };
  };
};