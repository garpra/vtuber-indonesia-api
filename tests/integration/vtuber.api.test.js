const request = require("supertest");
const app = require("../../src/app");
const db = require("../../src/database/connection");

beforeAll(() => {
  const fs = require("fs");
  const path = require("path");
  const schema = fs.readFileSync(
    path.join(__dirname, "../../schema.sql"),
    "utf-8",
  );
  db.exec(schema);

  require("../../src/database/seed");
});

afterAll(() => {
  db.close();
  const fs = require("fs");
  if (fs.existsSync("./data/vtubers-test.db")) {
    fs.unlinkSync("./data/vtubers-test.db");
  }
});

describe("GET /api/v1/health", () => {
  it("should return 200 and success true", async () => {
    const res = await request(app).get("/api/v1/health");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe("GET /api/v1/vtubers", () => {
  it("should return 200 and success true", async () => {
    const res = await request(app).get("/api/v1/vtubers");

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
  it("should return pagination metadata", async () => {
    const res = await request(app).get("/api/v1/vtubers");

    expect(res.body).toHaveProperty("data.pagination");
    expect(res.body.data.pagination).toHaveProperty("total");
    expect(res.body.data.pagination).toHaveProperty("page");
    expect(res.body.data.pagination).toHaveProperty("limit");
    expect(res.body.data.pagination).toHaveProperty("totalPages");
  });
});

describe("GET /api/v1/vtubers/:id", () => {
  it("should return 200 when vtuber found", async () => {
    const res = await request(app).get("/api/v1/vtubers/1");

    expect(res.status).toBe(200);
  });

  it("should return 404 when vtuber not found", async () => {
    const res = await request(app).get("/api/v1/vtubers/999");

    expect(res.status).toBe(404);
  });
});

describe("POST /api/v1/vtubers", () => {
  it("should return 201 when data valid", async () => {
    const res = await request(app)
      .post("/api/v1/vtubers")
      .send({ name: "Test VTuber", status: "active" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(201);
  });

  it("should return 400 when name is missing", async () => {
    const res = await request(app)
      .post("/api/v1/vtubers")
      .send({ agency: "Hololive" })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/v1/vtubers/:id", () => {
  it("should return 404 when vtuber not found", async () => {
    const res = await request(app).delete("/api/v1/vtubers/999");

    expect(res.status).toBe(404);
  });
  it("should return 200 when vtuber deleted", async () => {
    const res = await request(app).delete("/api/v1/vtubers/1");

    expect(res.status).toBe(200);
  });
});

describe("PUT /api/v1/vtubers/:id", () => {
  it("should return 200 when data valid", async () => {
    const res = await request(app)
      .put("/api/v1/vtubers/2")
      .send({
        name: "Testing name",
        agency: "Hololive",
        status: "active",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
  });
  it("should return 404 when vtuber not found", async () => {
    const res = await request(app)
      .put("/api/v1/vtubers/999")
      .send({
        name: "Testing name",
        agency: "Hololive",
        status: "active",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(404);
  });
  it("should return 400 when name is missing", async () => {
    const res = await request(app)
      .put("/api/v1/vtubers/2")
      .send({
        agency: "Hololive",
        status: "active",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });
});

describe("PATCH /api/v1/vtubers/:id", () => {
  it("should return 200 when partial update valid", async () => {
    const res = await request(app)
      .patch("/api/v1/vtubers/2")
      .send({
        agency: "Testing",
      })
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
  });
  it("should return 400 when body is empty", async () => {
    const res = await request(app)
      .patch("/api/v1/vtubers/2")
      .send({})
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });
});
