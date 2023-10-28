const express = require("express");
const cors = require("cors");

const app = express();

require('dotenv').config()

const logObject = require('./app/component/logger')

const IP_SERVER = process.env.IP_SERVER || "127.0.0.1";
const PORT = process.env.PORT || 8080;

const { checkAllowedIp } = require("./app/middleware");

let 
    logger = null

logger = logObject.init()

var corsOptions = {
  origin: "http://" + IP_SERVER + ":" + 8080
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// NOTE:
// set the request limit to 1mb, default is 100kb refer -> https://stackoverflow.com/questions/59485258/getting-error-payloadtoolargeerror-request-entity-too-large-in-case-of-using-ex

app.listen(PORT, err => {
  err ?
    logger.info(`Error in server setup =`, err) :
    logger.info(`Server started on port =`, PORT);
});

app.get("/",
  [checkAllowedIp.doCheck],
  (req, res) => {
  res.json({ message: "Welcome :D" });
});

require('./app/routes/order.routes')(app);
require('./app/routes/restaurant.routes')(app);
require('./app/routes/patient.routes')(app);
require('./app/routes/menu.routes')(app);
require('./app/routes/dashboard.routes')(app);

module.exports = app;
