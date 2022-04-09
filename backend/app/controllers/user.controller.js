const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? + size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: users } = data;
  const currentPage = page ? + page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, users, totalPages, currentPage };
};

exports.allAccess = (req, res) => {
    res.status(200).send("Conteúdo de acesso público.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("Conteúdo de acesso para usuários comuns");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Conteúdo de acesso para usuários do tipo Admin");
  };

  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Conteúdo de acesso para usuários do tipo Moderador");
  };

  exports.findAll = (req, res) => {

    //const name = req.query.name;
    const { page, size, name } = req.query;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    User.findAndCountAll({ where: condition, limit, offset })
      .then(data => { 
        const response = getPagingData(data, page, limit);
        res.send(response); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao retornar os usuários" }); });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Não foi possível encontrar o usuário com id ${id}.` });
      }
    })
    .catch(err => { res.status(500).send({ message: `Erro ao reotornar usuário com id ${id}`}); });
};

exports.update = (req, res) => {
    const id = req.params.id;
    User.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({ message: "Uauário atualizado com sucesso" });
        } else {
          res.send({ message: `Não foi possível atualizar usuário com id ${id}` });
        }
      })
      .catch(err => { res.status(500).send({ message: `Erro ao atualizar o usuário com id ${id}` }); });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({ message: "usuário deletado com sucesso" });
        } else {
          res.send({ message: `Não foi possível deletar usuário com id ${id}` });
        }
      })
      .catch(err => { res.status(500).send({ message: `Não foi possível deletar o usuário com id ${id}` }); });
};
