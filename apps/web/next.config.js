
const withPlugins = require('next-compose-plugins');

const withTM = require("next-transpile-modules")([
  "@flakes/api-helpers",
  "@flakes/db",
  "@flakes/cron-server"
]);

module.exports = withPlugins([
  [withTM, { reactStrictMode: true, }],
]);
