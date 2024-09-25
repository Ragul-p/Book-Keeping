const Books = require("./books.model");
const Libraries = require("./libraries.model");
const Users = require("./users.model");

Users.hasMany(Books, { foreignKey: "borrowedBy" });
Books.belongsTo(Users, { as: 'borrowerDetails', foreignKey: "borrowedBy" });

Libraries.hasMany(Books, { foreignKey: "libraryId" });
Books.belongsTo(Libraries, { foreignKey: "libraryId" });
