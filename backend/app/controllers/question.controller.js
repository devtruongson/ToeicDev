const db = require("../models");
const Question = db.question;

exports.getAllQuestion = async (req, res) => {
  try {
    const questions = await Question.findAll();
    const questionSendClient = questions.map(question => {
      question.question = question.Questions.map(q => {
        q.question = JSON.parse(q.question);
        q.answer = JSON.parse(q.answer);
        return q;
      });
      return question
    })
    console.log("check questionSendClient", questionSendClient);
    res.status(200).json(questionSendClient);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getByPID = async (req, res) => {
  try {
    const questions = await Question.findAll({ where: { parentId: req.params.parentID } });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.CreateNewQuestion = async (req, res) => {
  try {
    const { parentId, ...rest } = req.body;
    const question = await Question.create({ parentId, ...rest });
    res.status(200).send({ message: "add data success!", question });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.UpdateQuestion = async (req, res) => {
  try {
    const { parentId, ...rest } = req.body;
    await Question.update(
      { parentId, ...rest },
      { where: { id: req.params.Id } }
    );
    res.status(200).send({ message: "Edit data success!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.DeleteQuestionById = async (req, res) => {
  try {
    await Question.destroy({ where: { id: req.params.ID } });
    res.status(200).send({ message: "delete data success!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
