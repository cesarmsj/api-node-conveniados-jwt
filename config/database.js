const tedious = require('tedious');
const { Sequelize } = require('sequelize');

const { dbName, dbConfig } = require('./config.json');

module.exports = db = {};

initialize();

async function initialize() {
    const dialect = 'mssql';
    const host = dbConfig.server;
    const { userName, password } = dbConfig.authentication.options;

    await ensureDbExists(dbName);

    const sequelize = new Sequelize(dbName, userName, password, {
        host: host,
        dialect: dialect,
        pool: {
        max: 5,
        min: 0,
        idle: 10000
        },
            dialectOptions: {
                instanceName: 'MSSQLSERVER',
                domain: 'WORKGROUP'
            }
        });

    // init models and add them to the exported db object
    db.Usuarios = require('../models/usuario')(sequelize);
    db.Conveniados = require('../models/conveniado')(sequelize);
    db.Descontos = require('../models/desconto')(sequelize);
    db.Tags = require('../models/tag')(sequelize);
    db.ConveniadosXTags = require('../models/conveniadoxtag')(sequelize);

    db.Conveniados.belongsToMany(db.Tags, { through: db.ConveniadosXTags })
    db.Tags.belongsToMany(db.Conveniados, { through: db.ConveniadosXTags })

    // sync all models with database
    await sequelize.sync({ alter: true });
}

async function ensureDbExists(dbName) {
    return new Promise((resolve, reject) => {
        const connection = new tedious.Connection(dbConfig);
        connection.connect((err) => {
            if (err) {
                console.error(err);
                reject(`Connection Failed: ${err.message}`);
            }

            const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
            const request = new tedious.Request(createDbQuery, (err) => {
                if (err) {
                    console.error(err);
                    reject(`Create DB Query Failed: ${err.message}`);
                }

                // query executed successfully
                resolve();
            });
            connection.execSql(request);
        });
    });
}