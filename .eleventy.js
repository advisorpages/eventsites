module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "docs" // 👈 this must match your publish_dir
    }
  };
};
