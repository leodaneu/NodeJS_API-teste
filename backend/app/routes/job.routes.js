const controller = require("../controllers/job.controller");

module.exports = app => {
    var router = require("express").Router();
    
    router.post("/api/jobs", controller.create);    
    router.get("/api/jobs", controller.findAll);
    router.get("/api/jobs/active", controller.findAllActive);
    router.get("/api/jobs/:id", controller.findOne);
    router.put("/api/jobs/:id", controller.update);
    router.delete("/api/jobs/:id", controller.delete);
    router.delete("/api/jobs", controller.deleteAll);
    
    app.use('/api/jobs', router);
  };