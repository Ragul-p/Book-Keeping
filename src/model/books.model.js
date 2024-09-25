const { DataTypes } = require("sequelize");

const db = require("../db/db-config");

const Books = db.define("Books", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    imageUrl: {
        type: DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.INTEGER
    }
});

module.exports = Books;