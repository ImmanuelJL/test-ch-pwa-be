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
        	currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS"),
        	result1,
        	result2,
        	result3

		logger.info(`Start process at = `, currentDateTime)

		const sqlSumTrx = `select count(id) as sqlSumTrx from trx_header where deleted_at is null`;

		const sqlSumTrxPerRestaurant = `select sum(total_amount) as sqlSumTrxPerRestaurant, mst_restaurant.name from trx_header join mst_restaurant on mst_restaurant.id = trx_header.restaurant_id where trx_header.deleted_at is null group by restaurant_id`;

		const sqlSumTrxDetail = `SELECT count(trx_detail.id) as sqlSumTrxDetail, mst_menu.name FROM trx_detail join mst_menu on mst_menu.id = trx_detail.mst_menu_id where trx_detail.deleted_at is null group by mst_menu_id order by count(trx_detail.id) desc;`;

		try {
			var [rows] = await dbMySqlQuery.query(sqlSumTrx);
			result1 = rows

			var [rows] = await dbMySqlQuery.query(sqlSumTrxPerRestaurant);
			result2 = rows

			var [rows] = await dbMySqlQuery.query(sqlSumTrxDetail);
			result3 = rows

			logger.info(`Finish process in ${((((hrtime[0] * 1e9) + hrtime[1]) - nanosec) / 1e9)} secs`)

			return res.status(200).send({
				message: "Get data success.",
				dataTransaction: result1,
				dataPerRestaurant: result2,
				dataMenu: result3,
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
