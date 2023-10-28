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

		const sqlListTrxHeader = `select * from trx_header order by id desc`;

		try {
			var [rows] = await dbMySqlQuery.query(sqlListTrxHeader);

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

	_create: async function (req, res) {

		let 
			hrtime = process.hrtime(),
        	nanosec = (hrtime[0] * 1e9) + hrtime[1],
        	currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS")

		logger.info(`Start process at = `, currentDateTime)

		const {
			restaurantId,
			patientId,
			detailOrder
		} = req.body;

		const sqlInsertTrxHeader = `INSERT INTO
									trx_header(restaurant_id, patient_id, status, total_amount)
									VALUES(?, ?, ?, ?)`;

		const valuesInsertTrxHeader = [
			restaurantId,
			patientId,
			'new',
			0
		];

		// Validation
		if (restaurantId === null || restaurantId === '') {
			return res.status(400).send({
				message: "Restaurant is required.",
				data: null,
			});
		} else if (patientId === null || patientId === '') {
			return res.status(400).send({
				message: "Patient is required.",
				data: null,
			});
		}

		try {
			var [rows] = await dbMySqlQuery.query(sqlInsertTrxHeader, valuesInsertTrxHeader);

			if (rows.affectedRows > 0) {
				var totalAmount = 0;

				for await (let detailOrders of detailOrder) {
					var sqlInsertTrxDetail = `INSERT INTO
									trx_detail(trx_header_id , mst_menu_id , amount)
									VALUES(?, ?, ?)`;

					var valuesInsertTrxDetail = [
						rows.insertId,
						detailOrders.id,
						detailOrders.amount
					];

					await dbMySqlQuery.query(sqlInsertTrxDetail, valuesInsertTrxDetail);

					totalAmount += detailOrders.amount;
		        }

		        const sqlUpdateTrxHeader = `Update trx_header set total_amount = ? where id = ?`;

				const valuesUpdateTrxHeader = [
					totalAmount,
					rows.insertId,
				];

				await dbMySqlQuery.query(sqlUpdateTrxHeader, valuesUpdateTrxHeader);
			}

			const dataResponse = {
				id: rows.insertId,
			};

			logger.info(`Finish process in ${((((hrtime[0] * 1e9) + hrtime[1]) - nanosec) / 1e9)} secs`)

			return res.status(200).send({
				message: "Post data success.",
				data: dataResponse,
			});
		} catch (error) {
			logger.info(`error post data process =`, error)
			
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

	_show: async function (req, res, orderId) {

		let 
			hrtime = process.hrtime(),
        	nanosec = (hrtime[0] * 1e9) + hrtime[1],
        	currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS")

		logger.info(`Start process at = `, currentDateTime)

		const sqlListTrxHeader = `select * from trx_header where id = ?`;

		const valuesListTrxHeader = [
			req.params.orderId
		];

		try {
			var [rows] = await dbMySqlQuery.query(sqlListTrxHeader, valuesListTrxHeader);

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

	_update: async function (req, res) {

		let 
			hrtime = process.hrtime(),
        	nanosec = (hrtime[0] * 1e9) + hrtime[1],
        	currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS")

		logger.info(`Start process at = `, currentDateTime)

		const {
			trxHeaderId,
			status,
			remark
		} = req.body;

		const sqlUpdateTrxHeader = `Update trx_header set status = ?, remark = ? where id = ?`;

		const valuesUpdateTrxHeader = [
			status,
			remark,
			trxHeaderId
		];

		// Validation
		if (trxHeaderId === null || trxHeaderId === '') {
			return res.status(400).send({
				message: "Trx ID is required.",
				data: null,
			});
		} else if (status === null || status === '') {
			return res.status(400).send({
				message: "Status is required.",
				data: null,
			});
		}

		try {
			var [rows] = await dbMySqlQuery.query(sqlUpdateTrxHeader, valuesUpdateTrxHeader);

			if (rows.affectedRows > 0) {
				logger.info(`Update data success`)
			}

			const dataResponse = {
				id: trxHeaderId,
			};

			logger.info(`Finish process in ${((((hrtime[0] * 1e9) + hrtime[1]) - nanosec) / 1e9)} secs`)

			return res.status(200).send({
				message: "Put data success.",
				data: dataResponse,
			});
		} catch (error) {
			logger.info(`error post data process =`, error)
			
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
