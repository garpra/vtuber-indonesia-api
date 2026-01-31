function successResponse(data, message = "OK") {
  return {
    success: true,
    message,
    data,
  };
}

function errorResponse(error, details = []) {
  return {
    success: false,
    error,
    details,
  };
}

module.exports = {
  successResponse,
  errorResponse,
};
