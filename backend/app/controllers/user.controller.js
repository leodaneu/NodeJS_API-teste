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