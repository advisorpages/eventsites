const { DateTime } = require("luxon");
const crypto = require("crypto");

module.exports = function (eleventyConfig) {

  // Format date using Luxon
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  // Format "HH:mm – HH:mm" to "h:mma – h:mma"
  eleventyConfig.addFilter("formatTimeRange", (timeRange) => {
    if (!timeRange || !timeRange.includes("–")) return timeRange;

    const [start, end] = timeRange.split("–").map(t => t.trim());

    const formatTime = (t) =>
      DateTime.fromFormat(t, "HH:mm").toFormat("h:mma").toLowerCase();

    return `${formatTime(start)} – ${formatTime(end)}`;
  });

  // Make absolute URL using custom domain
  eleventyConfig.addFilter("url", (path) => {
    return "https://advisorpages.github.io/eventsites" + path;
  });

  // Deterministic random Tailwind color (based on string hash)
  eleventyConfig.addFilter("randomColor", (input) => {
    const colors = [
      "pink-500",
      "blue-500",
      "green-500",
      "purple-500",
      "orange-500",
      "teal-500",
      "red-500",
      "indigo-500",
      "yellow-500",
      "cyan-500"
    ];
    const hash = crypto.createHash("md5").update(input).digest("hex");
    const index = parseInt(hash.slice(0, 2), 16) % colors.length;
    return colors[index];
  });

  // Load all markdown event pages
  eleventyConfig.addCollection("events", function (collectionApi) {
    const events = collectionApi.getFilteredByGlob("event-pages/*.md");
    console.log("📦 Loaded event files:", events.map(e => e.inputPath));
    return events;
  });

  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "docs"
    }
  };
};
