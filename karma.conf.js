// karma.conf.js
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      // Setup de jsdom para simular el DOM
      { pattern: 'test-setup.js', watched: false },
      // Archivos de prueba
      { pattern: 'src/**/*.spec.js', watched: true }
    ],
    reporters: ['spec', 'kjhtml'],
    browsers: ['ChromeHeadless'],
    singleRun: true,
    concurrency: Infinity,
    client: {
      clearContext: false,
      jasmine: {
        random: false
      }
    }
  });
};