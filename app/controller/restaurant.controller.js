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

		const sqlListRestaurant = `select * from mst_restaurant where deleted_at is null order by name asc`;

		try {
			var [rows] = await dbMySqlQuery.query(sqlListRestaurant);

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
			status,
			name
		} = req.body;

		const sqlInsertMstRestaurant = `INSERT INTO
									mst_restaurant(status, name)
									VALUES(?, ?)`;

		const valuesInsertMstRestaurant = [
			status,
			name
		];

		// Validation
		if (status === null || status === '') {
			return res.status(400).send({
				message: "Status is required.",
				data: null,
			});
		} else if (name === null || name === '') {
			return res.status(400).send({
				message: "Name is required.",
				data: null,
			});
		}

		try {
			var [rows] = await dbMySqlQuery.query(sqlInsertMstRestaurant, valuesInsertMstRestaurant);

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

	_show: async function (req, res, restaurantId) {
		
		let 
			hrtime = process.hrtime(),
        	nanosec = (hrtime[0] * 1e9) + hrtime[1],
        	currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS")

		logger.info(`Start process at = `, currentDateTime)

		const sqlListRestaurant = `select * from mst_restaurant where id = ?`;

		const valuesListRestaurant = [
			req.params.restaurantId
		];

		try {
			var [rows] = await dbMySqlQuery.query(sqlListRestaurant, valuesListRestaurant);

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

	_update: async function (req, res, restaurantId) {

		let 
			hrtime = process.hrtime(),
        	nanosec = (hrtime[0] * 1e9) + hrtime[1],
        	currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS")

		logger.info(`Start process at = `, currentDateTime)

		const {
			status,
			name
		} = req.body;

		const sqlUpdateRestaurant = `Update mst_restaurant set status = ?, name = ? where id = ?`;

		const valuesUpdateRestaurant = [
			status,
			name,
			req.params.restaurantId
		];

		// Validation
		if (status === null || status === '') {
			return res.status(400).send({
				message: "Status is required.",
				data: null,
			});
		} else if (name === null || name === '') {
			return res.status(400).send({
				message: "Name is required.",
				data: null,
			});
		}

		try {
			var [rows] = await dbMySqlQuery.query(sqlUpdateRestaurant, valuesUpdateRestaurant);

			if (rows.affectedRows > 0) {
				logger.info(`Update data success`)
			}

			const dataResponse = {
				id: req.params.restaurantId,
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

	_delete: async function (req, res, restaurantId) {

		let 
			hrtime = process.hrtime(),
        	nanosec = (hrtime[0] * 1e9) + hrtime[1],
        	currentDateTime = moment().format("YYYY-MM-DD HH:mm:ss.SSS")

		logger.info(`Start process at = `, currentDateTime)

		const {
			status,
			name
		} = req.body;

		const sqlUpdateRestaurant = `Update mst_restaurant set deleted_at = ? where id = ?`;

		const valuesUpdateRestaurant = [
			currentDateTime,
			req.params.restaurantId
		];

		try {
			var [rows] = await dbMySqlQuery.query(sqlUpdateRestaurant, valuesUpdateRestaurant);

			if (rows.affectedRows > 0) {
				logger.info(`Delete data success`)
			}

			const dataResponse = {
				id: req.params.restaurantId,
			};

			logger.info(`Finish process in ${((((hrtime[0] * 1e9) + hrtime[1]) - nanosec) / 1e9)} secs`)

			return res.status(200).send({
				message: "Delete data success.",
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
