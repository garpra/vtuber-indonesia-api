const db = require("../database/connection");
const pagination = require("../utils/pagination");

function parseTags(vtuber) {
  return {
    ...vtuber,
    tags: vtuber.tags ? JSON.parse(vtuber.tags) : [],
  };
}

function getAll({ search, agency, platform, status, page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;

  let query = "SELECT * FROM vtubers WHERE 1=1";
  let countQuery = "SELECT COUNT(*) as count FROM vtubers WHERE 1=1";
  const params = [];

  if (search) {
    query += " AND name LIKE ?";
    countQuery += " AND name LIKE ?";
    params.push(`%${search}%`);
  }

  if (agency) {
    query += " AND agency LIKE ?";
    countQuery += " AND agency LIKE ?";
    params.push(agency);
  }

  if (platform) {
    query += " AND platform LIKE ?";
    countQuery += " AND platform LIKE ?";
    params.push(platform);
  }

  if (status) {
    query += " AND status = ?";
    countQuery += " AND status = ?";
    params.push(status);
  }

  const data = db
    .prepare(`${query} LIMIT ? OFFSET ?`)
    .all(...params, limit, offset);
  const { count } = db.prepare(countQuery).get(...params);

  return {
    data: data.map(parseTags),
    pagination: pagination.paginate(count, page, limit),
  };
}

function getById(id) {
  const data = db.prepare("SELECT * FROM vtubers WHERE id = ?").get(id);

  if (!data) {
    return null;
  }

  return parseTags(data);
}

module.exports = {
  getAll,
  getById,
};
