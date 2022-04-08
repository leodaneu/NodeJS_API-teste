const controller = require("../controllers/job.controller");

module.exports = app => {
    var router = require("express").Router();
    
    router.post("/", controller.create);    
    router.get("/", controller.findAll);
    router.get("/active", controller.findAllActive);
    router.get("/:id", controller.findOne);
    router.put("/:id", controller.update);
    router.delete("/:id", controller.delete);
    router.delete("/", controller.deleteAll);
    
    app.use('/api/jobs', router);
  };