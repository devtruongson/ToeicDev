
const db = require("../models");
const History = db.history;
const mongoose = require("mongoose");
const Question = db.question;

exports.getAllHistory = (req, res) => {
    History.find(function(err, history){
    if(err){
        console.log(err);
    }
    else {
        console.log(history);
        res.status(200).json(history);
    }
});
  // res.status(200).send("JSON.stringify(User.find())");
};
exports.addHistory = (req, res) => {
    console.log('id');
    // question list
    const idQuesList = req.body.answers.map((item)=>{
        return(mongoose.Types.ObjectId(item.questionId))
    })
    // console.log('id', idQuesList);
    Question.find({"_id":{$in:idQuesList}},function(err, questions){
      if(err){
          console.log(err);
      }
      else {
          const QuesList = questions
          
          let rightCount = {'t1':0,'t2':0,'t3':0,'t4':0,'t5':0,'t6':0,'t7':0}
          // console.log(req.body);

          const history = new History({
              userId: mongoose.Types.ObjectId(req.userId),
              examId: mongoose.Types.ObjectId(req.body.examId),
              answers: req.body.answers.map((item)=>{
                  const curQues = questions.find(findItem => findItem._id == item.questionId);
                  // console.log('curQues ',curQues,questions[0]._id, item.questionId );
                  if(curQues.answer.texts[0] == item.choice){
                    rightCount[curQues.type]+=1
                  }
                  return({
                  questionId: mongoose.Types.ObjectId(item.questionId),
                  choice:item.choice,
                  result:curQues.answer.texts[0] == item.choice,
                }
                  )
              }),
              score:{
                listening:listeningScore[rightCount['t1']+rightCount['t2']+rightCount['t3']+rightCount['t4']],
                reading:readingScore[rightCount['t5']+rightCount['t6']+rightCount['t7']],
                partCount:[rightCount['t1'],rightCount['t3'],rightCount['t3'],rightCount['t4'],rightCount['t5'],rightCount['t6'],rightCount['t7']]
              },
              time:req.body.time,
          })
          history.save(function(err, history){
          if(err){
              console.log(err);
          }
          else {
              res.status(200).json(history);
          }
      });
      }
    })

  // res.status(200).send("JSON.stringify(User.find())");
};
exports.getByPID = (req, res) => {
    console.log(req.params.parentID);
    let pID=req.params.parentID;
    pID = mongoose.Types.ObjectId(pID);
    console.log(pID);
    Question.find({"parentId":pID},function(err, questions){
    if(err){
        console.log(err);
    }
    else {
        res.status(200).json(questions);
    }
});
  // res.status(200).send("JSON.stringify(User.find())");
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
//                         0   1   2   3   4   5   6   7   8   9
const listeningScore = [   5,  5,  5,  5,  5,  5,  5, 10, 15, 20,   //0
                           25, 30, 35, 40, 45, 50, 55, 60, 65, 70,   //1x
                           75, 80, 85, 90, 95,100,105,110,115,120,   //2x
                          125,135,140,145,150,155,160,165,170,180,  //3x
                          185,190,195,200,210,220,225,230,235,240,  //4x
                          245,250,255,260,270,275,280,285,295,300,  //5x
                          305,310,315,320,325,330,335,340,345,350,  //6x
                          360,365,370,375,380,390,395,400,405,410,  //7x
                          420,425,430,435,440,450,455,460,470,475,  //8x
                          480,485,490,495,495,495,495,495,495,495,  //9x
                          495
                        ]

//                          0   1   2   3   4   5   6   7   8   9
const readingScore = [      5,  5,  5,  5,  5,  5,  5,  5,  5,  5,    //0x
                           10, 15, 20, 25, 30, 35, 40, 45, 50, 55,    //1x
                           60, 65, 70, 75, 80, 90, 95,100,110,115,    //2x
                          120,125,135,140,145,150,155,160,165,170,    //3x
                          175,180,185,190,195,200,210,220,225,230,    //4x
                          235,240,250,255,260,270,275,280,285,290,    //5x
                          295,300,305,310,320,325,330,335,340,345,    //6x
                          350,355,360,365,370,375,380,385,390,395,    //7x
                          400,405,410,415,420,425,430,435,440,445,    //8x
                          450,455,465,470,480,485,490,495,495,495,    //9x
                          495
                        ]