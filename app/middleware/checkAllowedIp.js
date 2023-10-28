require('dotenv').config()

doCheck = (req, res, next) => {

  let clientIp = req.socket.remoteAddress
  let listAllowedIp = process.env.ALLOWED_IP.split(',')
  
  if (listAllowedIp.indexOf(clientIp) === -1) {
    return res.status(403).send({
      message: "Unauthorized!"
    });
  }

  next()

};

const checkAllowedIp = {
  doCheck: doCheck,
};

module.exports = checkAllowedIp;
