const { DataTypes } = require("sequelize");

const db = require("../db/db-config");

const Users = db.define("Users", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userType: {
        type: DataTypes.ENUM("AUTHOR", "BORROWER"),
        allowNull: false,
        defaultValue: "BORROWER"
    },
    userRole: {
        type: DataTypes.ENUM("ADMIN", "USER"),
        allowNull: false,
        defaultValue: "USER"
    }
});

module.exports = Users;