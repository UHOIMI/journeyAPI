var Sequelize = require('sequelize');

const dbConfig = new Sequelize('exjndb', 'postgres', 'Minosannv1', {
    host: 'api.mino.asia',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: true,
        define: {
        timestamps: false, //UpdateAtとCreatedAtを無効化
        freezeTableName: true, //テーブル名をそのままで
    },
});


module.exports = dbConfig;