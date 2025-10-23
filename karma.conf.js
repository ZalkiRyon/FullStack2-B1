// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'src/**/*.spec.js'
    ],
    reporters: ['spec'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity
  });
};