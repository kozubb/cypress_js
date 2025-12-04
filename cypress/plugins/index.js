module.exports = (on, config) => {
  require("@shelex/cypress-allure-plugin")(on, config);
  return config;
};
