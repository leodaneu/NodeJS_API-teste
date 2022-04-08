const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
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