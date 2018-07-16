var Sequelize = require('sequelize');

const dbConfig = new Sequelize('test', 'postgres', 'Minosannv1', {
   host: '35.200.49.1',
   dialect: 'postgres',

   pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    timestamps: false, 
    freezeTableName: true,
  }
});

module.exports = dbConfig;