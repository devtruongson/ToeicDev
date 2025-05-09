module.exports = (sequelize, DataTypes) => {
  const History = sequelize.define("History", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    examId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    answers: {
      type: DataTypes.JSON
    },
    score: {
      type: DataTypes.JSON
    },
    time: DataTypes.INTEGER
  }, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false
  });
  return History;
};
