const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  
  if (!token) {
    return res.status(403).send({ message: "Nenhum token retornado!" });
  }
  
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Não autorizado" });
    }

    req.userId = decoded.id;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getTypes().then(types => {
      for (let i = 0; i < types.length; i++) {
        if (types[i].name === "admin") {
          next();
          return;
        }
      }
      
      res.status(403).send({ message: "Requer tipo de usuário Admin!" });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getTypes().then(types => {
      for (let i = 0; i < types.length; i++) {
        if (types[i].name === "moderator") {
          next();
          return;
        }
      }
      
      res.status(403).send({ message: "Requer tipo de usuário Moderador" });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getTypes().then(types => {
      for (let i = 0; i < types.length; i++) {
        if (types[i].name === "moderator") {
          next();
          return;
        }
        
        if (types[i].name === "admin") {
          next();
          return;
        }
      }
      res.status(403).send({ message: "Requer tipo de usuário Moderador ou Admin" });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};

module.exports = authJwt;