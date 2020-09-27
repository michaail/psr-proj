import React from 'react';
import Amplify, {Storage, Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut, AmplifyS3ImagePicker } from '@aws-amplify/ui-react';
import config from './config';

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
  const onCHange = async (file) => {
    const {key} = await Storage.put('example.jpg', file, {
      contentType: 'image/jpeg'
    })
  }
  
  
  
  return(
  <div>
    <input 
      type='file'
      accept='image/jpeg'
      onChange={(e) => onCHange(e.target.files[0])}
    />
    {/* <AmplifySignOut />
    My app
    <AmplifyS3ImagePicker /> */}
  </div>
)}

export default withAuthenticator(App);
