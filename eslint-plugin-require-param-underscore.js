const underscoreRule = require("./lib/rules/require-param-underscore");
const plugin = { rules: { "require-param-underscore": underscoreRule } };
module.exports = plugin;