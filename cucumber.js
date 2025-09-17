module.exports = {
  default: [
    "--require-module ts-node/register",
    "--require ./step-definitions/**/*.ts",
    "--require ./support/**/*.ts",
    "--format allure-cucumberjs/reporter",
    "--format progress"
  ].join(" ")
};



