export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	s3: {
		REGION: 'eu-west-1',
		BUCKET: 'psr-user-file-bucket-19950723'
	},
	apiGateway: {
		REGION: 'eu-west-1',
		URL: 'https://ydqy9r2npi.execute-api.eu-west-1.amazonaws.com/beta'
	},
	cognito: {
		REGION: 'eu-west-1',
		USER_POOL_ID: 'eu-west-1_UuvmF3DPg',
		APP_CLIENT_ID: '5ur8voc39nirbh10r4hg5ca3t4',
		IDENTITY_POOL_ID: 'eu-west-1:44dab1fb-4079-425d-8402-2c3d32e59cd4'
	}
};