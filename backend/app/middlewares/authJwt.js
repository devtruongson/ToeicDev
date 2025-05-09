const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    // console.log(decoded);
    next();
  });
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: Role,
          through: { attributes: [] }
        }
      ]
    });
    if (!user) return res.status(404).send({ message: "User Not found!" });
    const roles = user.Roles.map(r => r.name);
    if (roles.includes("admin")) {
      return next();
    }
    return res.status(403).send({ message: "Require Admin Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId, {
      include: [
        {
          model: Role,
          through: { attributes: [] }
        }
      ]
    });
    if (!user) return res.status(404).send({ message: "User Not found!" });
    const roles = user.Roles.map(r => r.name);
    if (roles.includes("moderator")) {
      return next();
    }
    return res.status(403).send({ message: "Require Moderator Role!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator
};
module.exports = authJwt;
