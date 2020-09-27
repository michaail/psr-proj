import React from 'react';
import Amplify, { API } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

Amplify.configure(awsconfig);

const App = () => {
  const get = async () => {
    console.log('calling GET');
    const response = await API.get('ApiGatewayRestApi', '/test', { 'responseType': 'text'});
    console.log(`got response: ${response}`);
    alert(response);
  }

  return(
  <div>
    <AmplifySignOut />
    My app
    <button onClick={get}>GET</button>
  </div>
)}

export default withAuthenticator(App);
