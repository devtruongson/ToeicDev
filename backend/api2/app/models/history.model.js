const mongoose = require("mongoose");

const History = mongoose.model(
  "History",
  new mongoose.Schema({
    userId: mongoose.ObjectId,
    examId: mongoose.ObjectId,
    answers: [{
      type: Object,
      properties: {
        questionId:{
          type: mongoose.ObjectId
        },
        choices:{
          type: String
        },
      }
    }],
    score:{
      listening:Number,
      reading:Number,
      partCount:[{
        type: Number,
      }]
    },
    time:Number,
    createdAt:{},
  }, {
    timestamps: {
      createdAt: 'created_at', // Use `created_at` to store the created date
    }
    })
);

module.exports = History;
