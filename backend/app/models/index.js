const config = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.type = require("../models/type.model.js")(sequelize, Sequelize);
db.job = require("../models/job.model.js")(sequelize, Sequelize);

db.type.belongsToMany(db.user, {
  through: "user_types",
  foreignKey: "typeId",
  otherKey: "userId"
});

db.user.belongsToMany(db.type, {
  through: "user_types",
  foreignKey: "userId",
  otherKey: "typeId"
});

db.TYPES = ["user", "admin", "moderator"];

module.exports = db;