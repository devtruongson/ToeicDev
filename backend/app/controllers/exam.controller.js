const db = require("../models");
const questionService = require("../services/question.services");
const Question = db.question;
const Exam = db.exam;

exports.getAllExam = async (req, res) => {
  try {
    const exams = await Exam.findAll({
      include: [{ model: Question }]
    });
    const examSendClient = exams.map(examInstance => {
      const exam = examInstance.toJSON();
      exam.question = (exam.Questions || []).map(qInstance => {
        const q = typeof qInstance.toJSON === 'function' ? qInstance.toJSON() : qInstance;
        q.question = typeof q.question === 'string' ? JSON.parse(q.question) : q.question;
        q.answer = typeof q.answer === 'string' ? JSON.parse(q.answer) : q.answer;
        q._id = String(q.id);
        q.newOrder = q.orderIndex === 0 ? 1 : q.orderIndex;
        return q;
      });
      exam._id = String(exam.id);
      return exam;
    });
    res.status(200).json(examSendClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const examInstance = await Exam.findByPk(req.params.ID, {
      include: [{ model: Question }]
    });
    if (!examInstance) return res.status(404).json({ error: 'Not found' });
    const exam = examInstance.toJSON();
    exam.question = (exam.Questions || []).map(qInstance => {
      const q = typeof qInstance.toJSON === 'function' ? qInstance.toJSON() : qInstance;
      q.question = typeof q.question === 'string' ? JSON.parse(q.question) : q.question;
      q.answer = typeof q.answer === 'string' ? JSON.parse(q.answer) : q.answer;
      q._id = q.id;
      return q;
    });
    exam._id = exam.id;
    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.CreateNewExam = async (req, res) => {
  try {
    const exam = await Exam.create({ ...req.body });
    res.status(200).send({ message: "add data success!", exam });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.EditExam = async (req, res) => {
  try {
    await Exam.update(
      { ...req.body },
      { where: { id: req.params.Id } }
    );
    res.status(200).send({ message: "Edit data success!" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

exports.DeleteExamById = async (req, res) => {
  try {
    await Exam.destroy({ where: { id: req.params.ID } });
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

const AllExamQuery = [
  {
    $lookup: {
      from: "questions",
      // collection name in db
      localField: "_id",
      foreignField: "parentId",
      pipeline: [
        {
          $lookup: {
            from: "questions",
            // collection name in db
            localField: "_id",
            foreignField: "parentId",
            as: "childCard",
            pipeline: [
              {
                $sort: { 'newOrder': 1 }
              }
            ],
          }
        },
        {
          $sort: { 'newOrder': 1 }
        }
      ],
      as: "question"
    }
  }
]

const ExamUserQuery = [
  {
    $lookup: {
      from: "questions",
      // collection name in db
      localField: "_id",
      foreignField: "parentId",
      pipeline: [
        {
          $lookup: {
            from: "questions",
            // collection name in db
            localField: "_id",
            foreignField: "parentId",
            pipeline: [{
              $addFields: {
                choices: { $concatArrays: ["$answer.texts", "$answer.choices"] },
                answer: "$$REMOVE"
              }
            },
            ]
            ,
            as: "childCard"
          }
        }, {
          $addFields: {
            choices: { $concatArrays: ["$answer.texts", "$answer.choices"] },
            answer: "$$REMOVE"
          }
        }],
      as: "question"
    }
  }
]