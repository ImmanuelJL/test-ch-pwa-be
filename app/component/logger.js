const obj = () => {}

obj.debug = false

obj.init = () => {
    if (typeof obj.holder != "undefined") {
        if (obj.debug) {
            console.log("Logger holder already exists")
        }

        return obj.holder
    }

    if (obj.debug) {
        console.log("Logger holder will be constructed")   
    }

    try {
		const path = require('path');
		const log4js = require('log4js')
		require('dotenv').config()
		
		let loggerName = `${process.env.APP_NAME}`
		let loggerConfig = {
			appenders: {
				console: {
					type: 'console',
				},
				log: {
					type: 'dateFile',
					filename: path.join(__dirname, '../log/', `${loggerName}.log`),
					maxLogSize: 1024 * 1024 * 1024,
					filesToKeep: 20,
				}
			},
			categories: {
				default: {
					appenders: ['log', 'console'],
					level: 'trace',
				}
			},						
		}
		loggerConfig[loggerName] = {
			appenders: ['log', 'console'],
			level: 'trace',
		}
		log4js.configure(loggerConfig)

		obj.holder = log4js.getLogger(`${loggerName}`)

        if (obj.debug) {
            console.log("Logger holder already constructed")   
        }    
        
        return obj.holder
    }
    catch (e) {
        if (typeof obj.holder != "undefined") {
            delete obj.holder
        }
		
		if (obj.debug) {
			console.log("Logger holder already constructed")
		}

        throw e
    }
}

module.exports = obj