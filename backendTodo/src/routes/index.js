const { model } = require("mongoose");
const meRouter = require("./me");
function route(app) {
  app.use("/me", meRouter);
}
module.exports = route;
