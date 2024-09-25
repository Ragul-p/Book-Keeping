const { DataTypes } = require("sequelize");

const db = require("../db/db-config");

const Libraries = db.define("Libraries", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
});

module.exports = Libraries;