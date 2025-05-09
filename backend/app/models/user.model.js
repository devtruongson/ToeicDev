module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    image: DataTypes.STRING,
    uid: DataTypes.STRING,
    isVerify: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
  return User;
};
