const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config');

const sequelize = new Sequelize(dbConfig.DB_NAME, dbConfig.USER_NAME, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model")(sequelize, DataTypes);
db.role = require("./role.model")(sequelize, DataTypes);
db.question = require("./question.model")(sequelize, DataTypes);
db.history = require("./history.model")(sequelize, DataTypes);
db.exam = require("./exam.model")(sequelize, DataTypes);

db.ROLES = ["user", "admin", "moderator"];

// Associations
// User-Role (Many-to-Many)
db.user.belongsToMany(db.role, { through: "user_roles" });
db.role.belongsToMany(db.user, { through: "user_roles" });

// Question-Exam (One-to-Many)
db.exam.hasMany(db.question, { foreignKey: 'parentId' });
db.question.belongsTo(db.exam, { foreignKey: 'parentId' });

// History-User/Exam (Many-to-One)
db.history.belongsTo(db.user, { foreignKey: 'userId' });
db.history.belongsTo(db.exam, { foreignKey: 'examId' });

db.user.hasMany(db.history, { foreignKey: 'userId' });
db.exam.hasMany(db.history, { foreignKey: 'examId' });

module.exports = db;