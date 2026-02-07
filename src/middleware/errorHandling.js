const { errorResponse } = require("../utils/response");

function errorHandler(err, req, res, next) {
  console.error(err.message);

  return res.status(500).json(errorResponse("Internal server error"));
}

module.exports = errorHandler;
