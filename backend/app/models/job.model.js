module.exports = (sequelize, Sequelize) => {
    const Job = sequelize.define("job", {
      name: {type: Sequelize.STRING},
      status: {type: Sequelize.BOOLEAN },
      recurrence_type: { type: Sequelize.BOOLEAN},
      recurrence_value: { type: Sequelize.STRING }
    });
    
    return Job;
  };