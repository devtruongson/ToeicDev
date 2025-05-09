const db = require("../models");
const History = db.history;
const Question = db.question;

exports.getAllHistory = async (req, res) => {
  try {
    const history = await History.findAll();
    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addHistory = async (req, res) => {
  try {
    // Lấy danh sách câu hỏi
    const idQuesList = req.body.answers.map(item => item.questionId);
    const questions = await Question.findAll({
      where: { id: idQuesList }
    });
    let rightCount = { 't1': 0, 't2': 0, 't3': 0, 't4': 0, 't5': 0, 't6': 0, 't7': 0 };
    const answers = req.body.answers.map(item => {
      const curQues = questions.find(q => q.id == item.questionId);
      if (curQues && curQues.answer && curQues.answer.texts && curQues.answer.texts[0] == item.choice) {
        rightCount[curQues.type] += 1;
      }
      return {
        questionId: item.questionId,
        choice: item.choice,
        result: curQues && curQues.answer && curQues.answer.texts && curQues.answer.texts[0] == item.choice
      };
    });
    const history = await History.create({
      userId: req.userId,
      examId: req.body.examId,
      answers: answers,
      score: {
        listening: listeningScore[rightCount['t1'] + rightCount['t2'] + rightCount['t3'] + rightCount['t4']],
        reading: readingScore[rightCount['t5'] + rightCount['t6'] + rightCount['t7']],
        partCount: [rightCount['t1'], rightCount['t2'], rightCount['t3'], rightCount['t4'], rightCount['t5'], rightCount['t6'], rightCount['t7']]
      },
      time: req.body.time
    });
    res.status(200).json(history);
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

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

const listeningScore = [5, 5, 5, 5, 5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 135, 140, 145, 150, 155, 160, 165, 170, 180, 185, 190, 195, 200, 210, 220, 225, 230, 235, 240, 245, 250, 255, 260, 270, 275, 280, 285, 295, 300, 305, 310, 315, 320, 325, 330, 335, 340, 345, 350, 360, 365, 370, 375, 380, 390, 395, 400, 405, 410, 420, 425, 430, 435, 440, 450, 455, 460, 470, 475, 480, 485, 490, 495, 495, 495, 495, 495, 495, 495, 495];
const readingScore = [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 90, 95, 100, 110, 115, 120, 125, 135, 140, 145, 150, 155, 160, 165, 170, 175, 180, 185, 190, 195, 200, 210, 220, 225, 230, 235, 240, 250, 255, 260, 270, 275, 280, 285, 290, 295, 300, 305, 310, 320, 325, 330, 335, 340, 345, 350, 355, 360, 365, 370, 375, 380, 385, 390, 395, 400, 405, 410, 415, 420, 425, 430, 435, 440, 445, 450, 455, 465, 470, 480, 485, 490, 495, 495, 495, 495];