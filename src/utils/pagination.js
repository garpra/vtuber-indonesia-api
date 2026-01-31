function paginate(total, page, limit) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    offset: (page - 1) * limit,
  };
}

module.exports = { paginate };
