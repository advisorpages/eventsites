const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  // existing date filter
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  // new time range formatter
  eleventyConfig.addFilter("formatTimeRange", (timeRange) => {
    if (!timeRange || !timeRange.includes("–")) return timeRange;

    const [start, end] = timeRange.split("–").map(t => t.trim());

    const formatTime = (t) =>
      DateTime.fromFormat(t, "HH:mm").toFormat("h:mma").toLowerCase();

    return `${formatTime(start)} – ${formatTime(end)}`;
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
