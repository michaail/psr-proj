'use strict';
const AWS = require('aws-sdk');

AWS.config.update({region: 'eu-west-1'});

const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

module.exports.afterFileUpload = async (event, context, callback) => {
  const identity = event.Records[0].userIdentity;
  const s3 = event.Records[0].s3;

  const params = {
    TableName: 'beta-keys',
    Item: {
      'userId': {S: identity.principalId},
      'imgKey': {S: s3.object.key},
    }
  }

  ddb.putItem(params, (err, data) => {
    if (err) {
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify(
          {
            message: err,
            input: event,
          },
          null,
          2
        ),
      };
    } else {
      return {
        headers,
        statusCode: 200,
        body: JSON.stringify(
          {
            message: 'Done',
            input: event,
          },
          null,
          2
        ),
      };
    }
  })

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
