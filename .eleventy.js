const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("date", (value, format = "yyyy") => {
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  return {
    dir: {
      input: ".",              // keep as-is
      includes: "_includes",   // keep as-is
      data: "_data",           // keep as-is
      output: "docs"           // 👈 matches your publish_dir
    }
  };
};
