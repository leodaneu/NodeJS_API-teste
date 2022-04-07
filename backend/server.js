const express = require("express");
const cors = require("cors");
const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Type = db.type;
//db.sequelize.sync();

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop e faz o Resync do banco de dados');
  initial();
});


app.get("/", (req, res) => {
  res.json({ message: "Teste Semantix." });
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/job.routes')(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}.`);
});

function initial() {
    Type.create({ id: 1, name: "user" });
    Type.create({ id: 2, name: "moderator" });
    Type.create({ id: 3, name: "admin" });
  }