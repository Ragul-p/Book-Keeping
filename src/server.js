require("dotenv").config();
const postgresDB = require("./db/db-config");
const models = require("./model/index");

const http = require("http");
const PORT = process.env.PORT || 5000;


const app = require("./app");
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`server is listening on port ${PORT}`);
});
