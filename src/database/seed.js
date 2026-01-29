const fs = require("fs");
const path = require("path");
const db = require("./connection");

try {
  const row = db.prepare("SELECT COUNT(*) AS count FROM vtubers").get();

  if (row.count > 0) {
    console.log("The data is already available, skip the process...");
    process.exit(0);
  }

  const seedPath = path.join(__dirname, "..", "..", "data", "vtubers.json");
  const seedJSON = JSON.parse(fs.readFileSync(seedPath, "utf-8"));

  const insert =
    db.prepare(`INSERT INTO vtubers (name, nickname, agency, platform, youtube_channel, twitch_channel, twitter_handle, debut_date, birthday, character_designer, live2d_modeler, fanbase_name, tags, description, avatar_url, status)
VALUES (
    @name, @nickname, @agency, @platform, @youtube_channel, @twitch_channel, @twitter_handle, @debut_date, @birthday, @character_designer, @live2d_modeler, @fanbase_name, @tags, @description, @avatar_url, @status
);`);

  const insertMany = db.transaction((data) => {
    for (const vtuber of data) {
      insert.run({
        ...vtuber,
        tags: vtuber.tags ? JSON.stringify(vtuber.tags) : null,
      });
    }
  });

  insertMany(seedJSON);

  console.log("Data has been successfully added");
} catch (e) {
  console.error("Error: ", e.message);
  process.exit(1);
}
