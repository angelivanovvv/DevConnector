const express = require("express");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { check, validationResult } = require("express-validator");
const router = express.Router();

const config = require("config");
const User = require("../models/User");

//@Validation
const RegisterValidation = () => {
  const validations = [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Please enter valid email").isEmail(),
    check(
      "password",
      "Please enter password with 6 or more characters"
    ).isLength({ min: 6 })
  ];

  return validations;
};

//@route POST api/users
//#desc Register user
//@access Public
router.post("/", RegisterValidation(), async (req, res) => {
  const errors = validationResult(req);
  const { name, email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });

    //See if user exists
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    //Get user gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm"
    });

    //Create new user
    user = new User({
      name,
      email,
      avatar,
      password
    });

    //Encrypt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    //Return jsonWebToken
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
