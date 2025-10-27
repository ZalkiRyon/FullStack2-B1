// Karma configuration
module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      // Primero se cargan todos los archivos de lógica
      "src/components/admin/__tests__/*.logic.js",
      "src/components/common/__tests__/*.logic.js",
      // Luego los archivos de pruebas
      "src/components/admin/__tests__/*.spec.js",
      "src/components/common/__tests__/*.spec.js",
      "src/**/*.spec.js",
      "src/**/*.logic.spec.js",
      "src/**/*.logic.js",
    ],
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
