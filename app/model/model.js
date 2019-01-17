const model = {};

model.users = require('./usersModel');
model.plan = require('./planModel');
model.spot = require('./spotModel');
model.favorite = require('./favoriteModel');

model.users.hasOne(model.plan,{foreignKey: 'user_id'});
model.plan.belongsTo(model.users,{foreignKey: 'user_id'});

model.plan.hasOne(model.spot,{foreignKey:'plan_id',sourceKey:'plan_id'});
model.spot.belongsTo(model.plan,{foreignKey:'plan_id',targetKey:'plan_id'});
model.spot.hasOne(model.plan,{foreignKey:'plan_id'});
model.plan.belongsTo(model.spot,{foreignKey:'plan_id'});

model.users.hasMany(model.favorite,{foreignKey:'user_id',sourceKey:'user_id'});
model.favorite.belongsTo(model.users,{foreignKey:'user_id',targetKey:'user_id'});
model.plan.hasMany(model.favorite,{foreignKey:'plan_id',sourceKey:'plan_id'});
model.favorite.belongsTo(model.plan,{foreignKey:'plan_id',sourceKey:'plan_id'});
model.favorite.hasOne(model.spot,{foreignKey:'plan_id',sourceKey:'plan_id'});
model.spot.belongsTo(model.favorite,{foreignKey:'plan_id',targetKey:'plan_id'});

module.exports = model;