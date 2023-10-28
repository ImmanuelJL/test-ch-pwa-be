const { checkAllowedIp } = require("../middleware");
const controller = require("../controller/order.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/v1/order",
    [checkAllowedIp.doCheck],
    controller._index
  );

  app.post(
    "/api/v1/order",
    [checkAllowedIp.doCheck],
    controller._create
  );

  app.get(
    "/api/v1/order/:orderId",
    [checkAllowedIp.doCheck],
    controller._show
  );

  app.put(
    "/api/v1/order",
    [checkAllowedIp.doCheck],
    controller._update
  );
};
