'use strict';
const AWS = require('aws-sdk');
AWS.config.update({ region: "eu-west-1"});

module.exports.afterFileUpload = async (event, context) => {
  const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08"});
  const documentClient = new AWS.DynamoDB.DocumentClient({ region: "eu-west-1"});

  const identity = event.Records[0].userIdentity;
  const s3 = event.Records[0].s3;


  const params = {
    TableName: 'beta-keys',
    Item: {
      userId: identity.principalId,
      imgKey: s3.object.key,
    }
  }

  try {
    const data = await documentClient.put(params).promise();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
