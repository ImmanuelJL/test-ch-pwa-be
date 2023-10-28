const moment = require('moment');

const logObject = require('../component/logger')
const dbMySqlQuery = require('../config/db-mysql.query.config')

let 
	logger = null

logger = logObject.init()

module.exports = {
	_index: async function (req, res) {

		let 
			hrtime = process.hrtime(),
        	nanosec = (hrtime[0] * 1e9) + hrtime[1],
        	currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS")

		logger.info(`Start process at = `, currentDateTime)

		const sqlListMenu = `select * from mst_menu order by name asc`;

		try {
			var [rows] = await dbMySqlQuery.query(sqlListMenu);

			logger.info(`Finish process in ${((((hrtime[0] * 1e9) + hrtime[1]) - nanosec) / 1e9)} secs`)

			return res.status(200).send({
				message: "Get data success.",
				data: rows,
			});
		} catch (error) {
			logger.info(`error get data process =`, error)
			
			return res.status(500).send({
				message: "Whoops, looks like something went wrong.",
				data: null,
			});
		}

		logger.info(`Whoops, looks like something went wrong. No content.`)

		return res.status(204).send({
			message: "Whoops, looks like something went wrong. No content.",
			data: null,
		});

	},
};
