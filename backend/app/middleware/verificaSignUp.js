const db = require("../models");
const TYPES = db.TYPES;
const User = db.user;

checaNomeUsuarioOuEmailDuplicado = (req, res, next) => {
  User.findOne({ 
      where: { username: req.body.username }
  }).then(user => {
    if (user) {
      res.status(400).send({ message: "Este nome de usuário já foi usado" });
      return;
    }
    
    User.findOne({ 
        where: { email: req.body.email }
    }).then(user => {
      if (user) {
        res.status(400).send({ message: "Este email já foi usado" });
        return;
      }
      next();
    });
  });
};

checaTipoUsuarioExistente = (req, res, next) => {
  if (req.body.types) {
    for (let i = 0; i < req.body.types.length; i++) {
      if (!TYPES.includes(req.body.types[i])) {
        res.status(400).send({ message: "Tipo de usuário não existe " + req.body.types[i] });
        return;
      }
    }
  }
  next();
};

const verificaSignUp = {
    checaNomeUsuarioOuEmailDuplicado: checaNomeUsuarioOuEmailDuplicado,
    checaTipoUsuarioExistente: checaTipoUsuarioExistente
  };
  
  module.exports = verificaSignUp;