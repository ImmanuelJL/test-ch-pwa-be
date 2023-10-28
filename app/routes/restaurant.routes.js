const { checkAllowedIp } = require("../middleware");
const controller = require("../controller/restaurant.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get(
    "/api/v1/restaurant",
    [checkAllowedIp.doCheck],
    controller._index
  );

  app.post(
    "/api/v1/restaurant",
    [checkAllowedIp.doCheck],
    controller._create
  );

  app.get(
    "/api/v1/restaurant/:restaurantId",
    [checkAllowedIp.doCheck],
    controller._show
  );

  app.put(
    "/api/v1/restaurant/:restaurantId",
    [checkAllowedIp.doCheck],
    controller._update
  );

  app.delete(
    "/api/v1/restaurant/:restaurantId",
    [checkAllowedIp.doCheck],
    controller._delete
  );
};
