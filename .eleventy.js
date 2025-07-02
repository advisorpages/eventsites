const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  eleventyConfig.addFilter("formatTimeRange", (timeRange) => {
    if (!timeRange || !timeRange.includes("–")) return timeRange;

    const [start, end] = timeRange.split("–").map(t => t.trim());

    const formatTime = (t) =>
      DateTime.fromFormat(t, "HH:mm").toFormat("h:mma").toLowerCase();

    return `${formatTime(start)} – ${formatTime(end)}`;
  });

  // ✅ Add this to support {{ page.url | url }}
  eleventyConfig.addFilter("url", (path) => {
    return "https://calendar.8531.ca" + path;
  });

  eleventyConfig.addCollection("events", function (collection) {
    return collection.getFilteredByGlob("event-pages/*.md");
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
