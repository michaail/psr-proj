'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "eu-west-1"});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

module.exports.getKeys = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1"});

  console.log(event);

  const params = {
    TableName: 'beta-keys',
    Key: {
      userId: id
    }
  }

  return {
    headers,
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Ulabula!',
        input: event,
      },
      null,
      2
    ),
  };
  // try {
  //   const data = await documentClient.get(params).promise();
  //   console.log(data);
  // } catch (err) {
  //   console.log(err);
  // }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
