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

  // Absolute URL using custom domain
  eleventyConfig.addFilter("url", (path) => {
    return "https://advisorpages.github.io/eventsites" + path;
  });

  // Deterministic single Tailwind color
  eleventyConfig.addFilter("randomColor", (input) => {
    const colors = [
      "pink-500", "blue-500", "green-500", "purple-500",
      "orange-500", "teal-500", "red-500", "indigo-500",
      "yellow-500", "cyan-500"
    ];
    const hash = crypto.createHash("md5").update(input).digest("hex");
    const index = parseInt(hash.slice(0, 2), 16) % colors.length;
    return colors[index];
  });

  // Deterministic accent + form bg color pair
  eleventyConfig.addFilter("randomAccentPair", (input) => {
    const colorPairs = [
      { color: "pink-500", bg: "gray-900" },
      { color: "blue-500", bg: "slate-900" },
      { color: "green-500", bg: "gray-800" },
      { color: "purple-500", bg: "gray-900" },
      { color: "orange-500", bg: "neutral-900" },
      { color: "teal-500", bg: "zinc-900" },
      { color: "red-500", bg: "gray-900" },
      { color: "indigo-500", bg: "slate-800" },
      { color: "yellow-500", bg: "gray-800" },
      { color: "cyan-500", bg: "neutral-800" },
    ];
    const hash = crypto.createHash("md5").update(input).digest("hex");
    const index = parseInt(hash.slice(0, 2), 16) % colorPairs.length;
    return colorPairs[index];
  });

  // Load all event markdown files
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
