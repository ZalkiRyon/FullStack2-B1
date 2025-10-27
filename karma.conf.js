// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: ["src/**/*.logic.spec.js", "src/**/*.logic.js"],
    exclude: [],
    preprocessors: {},
    reporters: ["spec", "kjhtml"],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ["ChromeHeadless"],
    singleRun: false,
    concurrency: Infinity,
    client: {
      clearContext: false,
      jasmine: {
        random: false,
      },
    },
  });
};
