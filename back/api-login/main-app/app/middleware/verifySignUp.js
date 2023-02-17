const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  console.log("i'm inside checkduplicateusernameoremail.");
  console.log(req.body);
  try {
    // Username
    var user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    console.log(user);
    if (user) {
      console.log("inside username already exist");
      return res.status(400).send({
        message: "Failed! Username is already in use!",
      });
    }

    // Email
    console.log(user);
    user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (user) {
      console.log("user email already in use.");
      return res.status(400).send({
        message: "Failed! Email is already in use!",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "Couldn't validate username!",
      error: error.message,
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Failed! Role does not exist = " + req.body.roles[i],
        });
        return;
      }
    }
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
};

module.exports = verifySignUp;
