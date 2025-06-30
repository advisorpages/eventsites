const fs = require("fs");

module.exports = () => {
  const data = fs.readFileSync("./_data/events.json", "utf-8");
  return JSON.parse(data);
};
