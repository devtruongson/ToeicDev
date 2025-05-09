const db = require("../models");
const User = db.user;
const History = db.history;
const Exam = db.exam;
const Question = db.question;
const Role = db.role;

exports.allAccess = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.userBoard = async (req, res) => {
  try {
    // Lấy user và lịch sử, exam, question liên quan
    const user = await User.findOne({
      where: { id: req.userId },
      include: [
        {
          model: History,
          as: "Histories",
          include: [
            {
              model: Exam,
              include: [
                {
                  model: Question
                }
              ]
            }
          ]
        },
        {
          model: Role,
          through: { attributes: [] }
        }
      ]
    });

    // const userSendClient = {
    //   ...user,
    //   _id: String(user.id),
    // }

    // userSendClient.histories = user.Histories.map(examHistory => {
    //   examHistory.answers = JSON.parse(examHistory.answers);
    //   examHistory.score = JSON.parse(examHistory.score);
    //   examHistory.Exam.question = examHistory.Exam.Questions.map(qInstance => {
    //     console.log("check qInstance", qInstance);
    //     const q = typeof qInstance.toJSON === 'function' ? qInstance.toJSON() : qInstance;
    //     q.question = typeof q.question === 'string' ? JSON.parse(q.question) : q.question;
    //     q.answer = typeof q.answer === 'string' ? JSON.parse(q.answer) : q.answer;
    //     q._id = String(q.id);
    //     q.newOrder = q.orderIndex === 0 ? 1 : q.orderIndex;
    //     return q;
    //   });
    //   examHistory.exam = examHistory.Exam;
    //   examHistory._id = String(examHistory.id);
    //   return examHistory;
    // })

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
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