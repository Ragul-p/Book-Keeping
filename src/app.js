const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get("/", (req, res) => { return res.status(200).json({ message: "welcome to bookkeeping app RESTAPI" }) });


app.use("/api/users", require("./routes/user.router"));
app.use("/api/books", require("./routes/book.router"));
app.use("/api/libraries", require("./routes/libraries.router"));

module.exports = app;