module.exports = (sequelize, DataTypes) => {
  const Exam = sequelize.define("Exam", {
    Name: DataTypes.STRING,
    description: DataTypes.STRING,
    ltype: {
      type: DataTypes.STRING,
      defaultValue: 'toeic'
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'fulltest'
    }
  });
  return Exam;
};
