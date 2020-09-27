export default {
	MAX_ATTACHMENT_SIZE: 5000000,
	s3: {
		REGION: 'eu-west-1',
		BUCKET: 'psr-user-file-bucket-011899'
	},
	apiGateway: {
		REGION: 'eu-west-1',
		URL: 'https://07kegx9n9d.execute-api.eu-west-1.amazonaws.com/beta'
	},
	cognito: {
		REGION: 'eu-west-1',
		USER_POOL_ID: 'eu-west-1_yfiMk61dY',
		APP_CLIENT_ID: '46akh1up0gopppcaj7i9irvrjj',
		IDENTITY_POOL_ID: 'eu-west-1:83ecdb04-34e8-48b5-9c90-5070744499c5'
	}
};