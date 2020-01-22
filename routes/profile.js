const express = require("express");

const request = require("request");
const config = require("config");
const { check, validationResult } = require("express-validator");

const validations = require("../utils/validations");

const router = express.Router();

const auth = require("../middleware/auth");
const github = require("../config/github");

const Profile = require("../models/Profile");
const User = require("../models/User");
const Post = require("../models/Post");

const profile = validations.profile();
const experience = validations.experience();
const education = validations.education();

router
  //@route GET api/profile/me
  //#desc Get current user profile
  //@access Private
  .get("/me", auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id
      }).populate("user", ["name, avatar"]);

      if (!profile) {
        res.status(400).json({ msg: "There is no profile for this user" });
      }
      res.send(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  })
  //@route POST api/profile
  //#desc Get list of all profiles
  //@access Public
  .get("/", async (req, res) => {
    try {
      const profile = await Profile.find().populate("user", ["name", "avatar"]);
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  //@route GET api/profile/user/:user_id
  //#desc Get profile by user ID
  //@access Public
  .get("/user/:user_id", async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.params.user_id
      }).populate("user", ["name", "avatar"]);

      if (!profile) {
        res.status(400).json({ msg: "Profile not found" });
      }
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      if (err.kind == "ObjectId") {
        res.status(400).json({ msg: "Profile not found" });
      }
      res.status(500).send("Server Error");
    }
  })
  //@route GET api/profile/github/:username
  //#desc Get user repos from Github
  //@access Public
  .get("/github/:username", (req, res) => {
    try {
      const username = req.params.username;
      const clientId = config.get("githubClientId");
      const clientSecret = config.get("githubSecret");

      const options = {
        url: github.url(username, clientId, clientSecret),
        method: github.method("GET"),
        headers: github.headers()
      };

      request(options, (error, response, body) => {
        if (error) console.error(error);

        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: "No Github profile found" });
        }
        res.json(JSON.parse(body));
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  //@route POST api/profile
  //#desc Create or update user profile
  //@access Private
  .post("/", [auth, profile], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    //Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    //Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        //Update profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create profile
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  //@route DELETE api/profile
  //#desc Delete profile, user & post
  //@access Private
  .delete("/", auth, async (req, res) => {
    try {
      //Remove users posts
      await Post.deleteMany({ user: req.user.id });

      //Remove profile
      await Profile.findOneAndRemove({ user: req.user.id });

      //Remove user
      await User.findOneAndRemove({ _id: req.user.id });

      res.json({ msg: "user deleted" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  //@route PUT api/profile/experience
  //#desc Add profile exprerience
  //@access Private
  .put("/experience", [auth, experience], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.experience.unshift(newExp);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  //@route DELETE api/profile/experience/:exp_id
  //#desc Delete experience from profile
  //@access Private
  .delete("/experience/:exp_id", auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      //Get remove index
      const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.exp_id);

      profile.experience.splice(removeIndex, 1);
      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  //@route PUT api/profile/education
  //#desc Add profile education
  //@access Private
  .put("/education", [auth, education], async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const profile = await Profile.findOne({ user: req.user.id });
      profile.education.unshift(newEdu);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  })
  //@route DELETE api/profile/education/:edu_id
  //#desc Delete education from profile
  //@access Private
  .delete("/education/:edu_id", auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      //Get remove index
      const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.edu_id);
      profile.education.splice(removeIndex, 1);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
