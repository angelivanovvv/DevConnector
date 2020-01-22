const { check } = require("express-validator");
const constants = require("./constants");

const {
  login,
  register,
  profile,
  experience,
  education,
  post
} = constants.validationRules;

const LOGIN = () => [
  check(login.email.name, login.email.value).isEmail(),
  check(login.password.name, login.password.value).exists()
];

const REGISTER = () => [
  check(register.name.name, register.name.value)
    .not()
    .isEmpty(),
  check(register.email.name, register.email.value).isEmail(),
  check(register.password.name, register.password.value).isLength({ min: 6 })
];

const PROFILE = () => [
  check(profile.status.name, profile.status.value)
    .not()
    .isEmpty(),
  check(profile.skills.name, profile.skills.value)
    .not()
    .isEmpty()
];

const EXPERIENCE = () => [
  check(experience.title.name, experience.title.value)
    .not()
    .isEmpty(),
  check(experience.company.name, experience.company.value)
    .not()
    .isEmpty(),
  check(experience.from.name, experience.from.value)
    .not()
    .isEmpty()
];

const EDUCATION = () => [
  check(education.school.name, education.school.value)
    .not()
    .isEmpty(),
  check(education.degree.name, education.degree.value)
    .not()
    .isEmpty(),
  check(education.fieldofstudy.name, education.fieldofstudy.value)
    .not()
    .isEmpty(),
  check(education.from.name, education.from.value)
    .not()
    .isEmpty()
];

const POST = () => [
  check(post.text.name, post.text.value)
    .not()
    .isEmpty()
];

module.exports = {
  login: LOGIN,
  register: REGISTER,
  profile: PROFILE,
  experience: EXPERIENCE,
  education: EDUCATION,
  post: POST
};
