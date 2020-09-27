import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

const App = () => (
  <div>
    <AmplifySignOut />
    My app
  </div>
)

export default withAuthenticator(App);
