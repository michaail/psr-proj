import React from 'react';
import Amplify, {Storage, Auth } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import config from './config';
import ImagePicker from './ImagePicker';
import Gallery from './Gallery';


Amplify.configure({
  Auth: {
    mandatorySignIn: true,
		region: config.cognito.REGION,
		userPoolId: config.cognito.USER_POOL_ID,
		identityPoolId: config.cognito.IDENTITY_POOL_ID,
		userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
		bucket: config.s3.BUCKET,
		identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
			{
				name: 'testApiCall',
				endpoint: config.apiGateway.URL,
				region: config.apiGateway.REGION
			}
		]
  }
});

const App = () => {
  return(
    <div>
      <AmplifySignOut />
      <h1>Billy idol</h1>
      <ImagePicker />
      <Gallery />
    </div>
)}

export default withAuthenticator(App);
