const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
var crypto = require('crypto');
var nodemailer = require('nodemailer');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  try {
    const user = await User.create({
      username: req.body.username,
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8)
    });

    if (req.body.roles) {
      const roles = await Role.findAll({
        where: {
          name: req.body.roles
        }
      });
      await user.setRoles(roles);
      res.send({ message: "User was registered successfully!" });
    } else {
      const role = await Role.findOne({ where: { name: "user" } });
      await user.setRoles([role]);
      res.send({ message: "User was registered successfully!" });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      include: [
        {
          model: Role,
          through: { attributes: [] }
        }
      ]
    });
    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }
    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    var authorities = [];
    for (let i = 0; i < user.Roles.length; i++) {
      authorities.push("ROLE_" + user.Roles[i].name.toUpperCase());
    }
    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      roles: authorities,
      accessToken: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
