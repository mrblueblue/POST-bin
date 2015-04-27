var config = {
	
	'dev': {
		env : 'dev',
		server : {
			port: 3000,
			hostname: 'localhost'
		}, 
		logging: {
			level: 'trace'
		}
	},

	'prod': {
		env: 'prod',
		server: {
			port: process.env.PORT || 80,
			hostname: process.env.HOSTNAME || '127.0.0.1'
		},
		logging: {
			level: 'info'
		}
	},

	'test': {
		env: 'test',
		server: {
			port: 4000,
			hostname: 'localhost'
		}
	}
}

module.exports = config[ process.env.NODE_ENV || 'prod' ];
