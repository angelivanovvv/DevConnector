const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");

const router = express.Router();

const config = require("config");
const auth = require("../middleware/auth");
const User = require("../models/User");

const LoginValidation = () => {
  const validations = [
    check("email", "Please enter valid email").isEmail(),
    check("password", "Password is required").exists()
  ];

  return validations;
};

router
  //@route GET api/auth
  //@desc Get details to logged user
  //@access Private
  .get("/", auth, async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  })

  //@route POST api/auth
  //@desc Authenticate user & get token
  //@access Public
  .post("/", LoginValidation(), async (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Ivalid Credantials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Ivalid Credantials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;