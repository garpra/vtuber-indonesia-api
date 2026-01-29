require("dotenv").config();

const Database = require("better-sqlite3");
let db;

try {
  db = new Database(process.env.DB_PATH);
  console.log("Database connected:", process.env.DB_PATH);
} catch (e) {
  console.error("Error: ", e.message);
  process.exit(1);
}

module.exports = db;
