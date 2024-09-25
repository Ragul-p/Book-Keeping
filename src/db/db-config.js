const { Sequelize } = require("sequelize");

const pgConnection = new Sequelize(process.env.PG_DB_URI, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: { ssl: { require: true } },
    logging: false
});

pgConnection.authenticate()
    .then(() => { console.log("connected to postgres"); })
    .catch((err) => { console.log("failed to connect postgres", err.message); });



pgConnection.sync({ alter: true })
    .then(() => { console.log("db synced"); })
    .catch((err) => { console.log("failed to sync", err.message); });



module.exports = pgConnection;