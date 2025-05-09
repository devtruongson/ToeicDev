module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
    hasChild: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    question: {
      type: DataTypes.JSON
    },
    answer: {
      type: DataTypes.JSON
    },
    tags: {
      type: DataTypes.JSON
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 't1'
    },
    orderIndex: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  });
  return Question;
};
