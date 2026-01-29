const fs = require("fs");
const path = require("path");
const db = require("./connection");

try {
  const schemaPath = path.join(__dirname, "..", "..", "schema.sql");
  const schemaSql = fs.readFileSync(schemaPath, "utf-8");
  db.exec(schemaSql);
  console.log("Table has been successfully added");
} catch (e) {
  console.error("Error: ", e.message);
  process.exit(1);
}
