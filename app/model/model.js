const model = {};

model.users = require('./usersModel');
model.plan = require('./planModel');
model.spot = require('./spotModel');
model.favorite = require('./favoriteModel');

model.users.hasOne(model.plan,{foreignKey: 'user_id'});
model.plan.belongsTo(model.users,{foreignKey: 'user_id'});


module.exports = model;