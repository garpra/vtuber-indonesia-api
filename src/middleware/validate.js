const { errorResponse } = require("../utils/response");

function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const detail = error.details.map((d) => d.message);
      return res.status(400).json(errorResponse("Validation failed", detail));
    }

    next();
  };
}

module.exports = { validate };
