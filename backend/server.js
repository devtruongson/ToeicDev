const express = require("express");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");

const app = express();

var corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
const Role = db.role;

// Kết nối Sequelize và đồng bộ models
async function startServer() {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    console.log("Successfully connect to MySQL.");
    initial();
    // simple route
    app.get("/", (req, res) => {
      res.json({ message: "Welcome to Toeic application." });
    });
    // routes
    require("./app/routes/auth.routes")(app);
    require("./app/routes/user.routes")(app);
    require("./app/routes/question.routes")(app);
    require("./app/routes/exam.routes")(app);
    require("./app/routes/history.routes")(app);
    require("./app/routes/test.routes")(app);

    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port 123 ${PORT}.`);
    });
  } catch (err) {
    console.error("Connection error", err);
    process.exit();
  }
}

function initial() {
  Role.findOrCreate({ where: { name: "user" } });
  Role.findOrCreate({ where: { name: "moderator" } });
  Role.findOrCreate({ where: { name: "admin" } });
}

startServer();
