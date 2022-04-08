const db = require("../models");
const Job = db.job;
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: jobs } = data;
  const currentPage = page ? + page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, jobs, totalPages, currentPage };
};

exports.create = (req, res) => {
  
  if (!req.body.name) {
    res.status(400).send({ message: "Conteúdo não pode ser vazio" });
    return;
  }
  
  const job = {
    name: req.body.name,
    status: req.body.status,
    recurrence_type: req.body.recurrence_type ? req.body.recurrence_type : false,
    recurrence_value: req.body.recurrence_value ? req.body.recurrence_value : ''
  };

  Job.create(job)
    .then(data => { res.send(data); })
    .catch(err => {
      res.status(500).send({ message: err.message || "Ocorreu algum erro ao criar o job" }); });
};

exports.findAll = (req, res) => {

    //const name = req.query.name;
    const { page, size, name } = req.query;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    const { limit, offset } = getPagination(page, size);

    Job.findAll({ where: condition, limit, offset })
      .then(data => { 
        const response = getPagingData(data, page, limit);
        res.send(response); 
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Ocorreu algum erro ao retornar os jobs" }); });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Job.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Não foi possível encontrar o job com id ${id}.` });
      }
    })
    .catch(err => { res.status(500).send({ message: `Erro ao reotornar job com id ${id}`}); });
};

exports.update = (req, res) => {
    const id = req.params.id;
    Job.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({ message: "Job atualizado com sucesso" });
        } else {
          res.send({ message: `Não foi possível atualizar job com id ${id}` });
        }
      })
      .catch(err => { res.status(500).send({ message: `Erro ao atualizar o job com id ${id}` }); });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    Job.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({ message: "Job deletado com sucesso" });
        } else {
          res.send({ message: `Não foi possível deletar job com id ${id}` });
        }
      })
      .catch(err => { res.status(500).send({ message: `Não foi possível deletar o job com id ${id}` }); });
};

exports.deleteAll = (req, res) => {
    Job.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} jobs foram deletados com sucesso` });
        })
        .catch(err => {
          res.status(500).send({
            message: err.message || "Algum erro ocorreu ao tentar deletar os jobs" });
        });
};

exports.findAllActive = (req, res) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    Job.findAll({ where: { status: true } })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Algum erro ocorreu ao retornar os jobs" });
    });
};