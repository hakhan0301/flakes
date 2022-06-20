
const withPlugins = require('next-compose-plugins');

const withTM = require("next-transpile-modules")([
  "@cereal/api-helpers",
  "@cereal/db",
]);

module.exports = withPlugins([
  [withTM, { reactStrictMode: true, }],
]);
