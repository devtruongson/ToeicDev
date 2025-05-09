const db = require("../models");
const Question = db.question;

exports.getByPID = async (PID) => {
    try {
        // In Sequelize, we use findAll() instead of MongoDB's find()
        // The where clause specifies the condition (parentId = PID)
        const questions = await Question.findAll({
            where: {
                parentId: PID
            }
        });

        return questions;
    } catch (err) {
        console.log(err);
        return [];
    }
};