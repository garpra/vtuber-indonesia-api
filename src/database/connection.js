require("dotenv").config();

const Database = require("better-sqlite3");
const dbPath =
  process.env.NODE_ENV === "test"
    ? "./data/vtubers-test.db"
    : process.env.DB_PATH;
let db;

try {
  db = new Database(dbPath);
  console.log("Database connected: ", dbPath);
} catch (e) {
  console.error("Error: ", e.message);
  process.exit(1);
}

module.exports = db;
