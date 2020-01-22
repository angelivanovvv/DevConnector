const hasErrors = (res, errors) =>
  !errors.isEmpty() ? res.status(400).json({ errors: errors.array() }) : null;

module.exports = {
  hasErrors: hasErrors
};
