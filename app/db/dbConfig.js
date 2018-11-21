var Sequelize = require('sequelize');

const dbConfig = new Sequelize('jndb', 'postgres', 'Minosannv1', {
    host: '35.200.26.70',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: true,
        define: {
        timestamps: false,
        freezeTableName: true,
    },
});

module.exports = dbConfig;