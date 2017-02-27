var sequelize = require('../../db');

// Create the representation of the models
sequelize.sync({force:true}).then(function(err) {
  console.log('Create models into DB');
}, function(err) {
  console.error(err);
});