const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Type = db.type;
const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: bcrypt.hashSync(req.body.password, 8)
  })
    .then(user => {
      if (req.body.types) {
        Type.findAll({
          where: { name: { [Op.or]: req.body.types } }
        }).then(types => {
          user.setTypes(types).then(() => {
            res.send({ message: "Usuário registrado" });
          });
        });
      } else {        
        user.setTypes([1]).then(() => {
          res.send({ message: "Usuário registrado" });
        });
      }
    })
    .catch(err => { res.status(500).send({ message: err.message }); });
};

exports.signin = (req, res) => {
  User.findOne({
    where: { username: req.body.username }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado." });
      }
      
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      
      if (!passwordIsValid) {
        return res.status(401).send({ accessToken: null, message: "Senha inválida"});
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 horas
      });

      var authorities = [];
      user.getTypes().then(types => {
        for (let i = 0; i < types.length; i++) {
          authorities.push("TYPE_" + types[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          phone_number: user.phone_number,
          types: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => { res.status(500).send({ message: err.message }); });
};