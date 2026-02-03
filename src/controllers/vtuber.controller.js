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

function createVtuber(req, res) {
  const payload = req.body;
  const data = service.create(payload);

  if (!data) return res.status(400).json(errorResponse("Failed to add Vtuber"));

  return res.status(201).json(successResponse(data, "Vtuber created"));
}

function updateVtuber(req, res) {
  const id = parseInt(req.params.id);
  const payload = req.body;
  const data = service.update(id, payload);

  if (!data) return res.status(404).json(errorResponse("Vtuber not found"));

  return res.status(200).json(successResponse(data, "Vtuber updated"));
}

module.exports = {
  getAllVtuber,
  createVtuber,
  updateVtuber,
};
