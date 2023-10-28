const Pool = require("./pool-mysql");

module.exports = {

  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  // function query(quertText, params) {
  query: async function (quertText, params) {
    return new Promise((resolve, reject) => {
      Pool.execute(quertText, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

};
