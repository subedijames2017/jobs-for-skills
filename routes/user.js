const express = require("express");
var bcrypt = require("bcryptjs");
const knex = require("../db/knex");
const router = express.Router();
const jwt = require("jsonwebtoken");
const key = require("../config/keys");

//register
router.post("/register", (req, res, next) => {
  const validateRegisterInput = require("../utils/register");
  const { errors, isValid } = validateRegisterInput(req.body ? req.body : {});
  if (!isValid) {
    return res.status(400).send(errors);
  }
  const date = new Date();
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    avatar: `https://ui-avatars.com/api/?name=${req.body.first_name}&size=128`,
    created_date: date.toISOString().slice(0, 19).replace("T", " "),
  };
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      user.password = hash;
      knex("user")
        .insert(user)
        .then((response) => {
          if (response) {
            return res.send(response);
          } else {
            errors.noApps = "error while inserting user into databasee";
            return res.status(404).send(errors);
          }
        })
        .catch((err) => {
          console.log("TCL: err", err);
          errors.noApps = "error while inserting user into databasee";
          res.status(404).send(errors);
        });
    });
  });
});

router.post("/login", (req, res) => {
  const validLoginInput = require("../utils/login");
  const { errors, isValid } = validLoginInput(req.body ? req.body : {});
  if (!isValid) {
    return res.status(400).send(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  knex("user")
    .where("email", email)
    .select("*")
    .first()
    .then((user) => {
      if (user && user.password) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (isMatch) {
            const payload = {
              id: user.id,
              email: user.email,
              firstName: user.first_name,
              lastName: user.last_name,
              avatar: user.avatar,
            };
            //sign token
            jwt.sign(
              payload,
              key.secretOrKey,
              { expiresIn: 4000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          } else {
            return res.status(400).json({
              success: false,
              message: "invalid email password",
            });
          }
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "invalid email password",
        });
      }
    })
    .catch((err) => {
      console.log("🚀 ~ file: user.js ~ line 103 ~ router.post ~ err", err);
      return res.send({ success: false, message: "invalid email password" });
    });
});
router.get("/skills", (req, res) => {
  const userId = req.query.user_id;
  knex("user_skills")
    .where("user_id", userId)
    .select("*")
    .first()
    .then((user) => {
      return res.json({
        success: true,
        skills: user && user.skills ? user : {},
      });
    })
    .catch((err) => {
      console.log("🚀 ~ file: user.js ~ line 113 ~ router.get ~ err", err);
      return res.send({ success: false, message: "internal server error" });
    });
});
router.post("/skills", (req, res) => {
  const userId = req.body.user_id;
  const skills = req.body.skills;
  if (req.body.id) {
    let updateData = {
      id: req.body.id,
      user_id: userId,
      skills: JSON.stringify(skills),
    };
    knex("user_skills")
      .update(updateData)
      .where("user_id", userId)
      .then((skills) => {
        return res.json({
          success: true,
          message: "skills updated successfully",
        });
      })
      .catch((err) => {
        return res.send({ success: false, message: "internal server error" });
      });
  } else {
    let updateData = {
      user_id: userId,
      skills: JSON.stringify(skills),
    };
    knex("user_skills")
      .insert(updateData)
      .then((skills) => {
        return res.json({
          success: true,
          message: "skills added successfully",
        });
      })
      .catch((err) => {
        console.log("🚀 ~ file: user.js ~ line 150 ~ router.post ~ err", err);
        return res.send({ success: false, message: "internal server error" });
      });
  }
});

module.exports = router;
