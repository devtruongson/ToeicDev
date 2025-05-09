
const db = require("../models");
const mongoose = require("mongoose");
const User = db.user;

exports.allAccess = (req, res) => {
  User.find(function(err, users){
    if(err){
        console.log(err);
    }
    else {
        res.status(200).json(users);
    }
});
  // res.status(200).send("JSON.stringify(User.find())");
};

exports.userBoard = (req, res) => {
  User.aggregate([{
    $match: {
      "_id": mongoose.Types.ObjectId(req.userId)
    }
  },{
      $lookup: {
        from: "histories",
        // collection name in db
        localField: "_id",
        foreignField: "userId",
        as: "histories",
        pipeline:[{
          $lookup: {
            from: "exams",
            // collection name in db
            localField: "examId",
            foreignField: "_id",
            as: "exam",
            pipeline:[...AllExamQuery]
          }
        }]
      }}
    ])
    .exec((err, user) => {
      // console.log(user);
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      res.status(200).json(user);

    });

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
                $sort: {  'newOrder': 1 }
              }
            ],
          }
        },
        {
          $sort: {  'newOrder': 1 }
        }
      ],
      as: "question"
    }
  }
]