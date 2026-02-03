const { successResponse, errorResponse } = require("../utils/response");
const service = require("../services/vtuber.service");

function getAllVtuber(req, res) {
  const { search, agency, platform, status, page, limit } = req.query;
  const pageNum = parseInt(page) || 1;
  const limitNum = parseInt(limit) || 10;

  const data = service.getAll({
    search,
    agency,
    platform,
    status,
    page: pageNum,
    limit: limitNum,
  });

  return res.status(200).json(successResponse(data, "Vtuber found!"));
}

module.exports = {
  getAllVtuber,
};
