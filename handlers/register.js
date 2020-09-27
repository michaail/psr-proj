'use strict';
import * as AWS from 'aws-sdk'
import stream from 'stream'
import sharp from 'sharp';

const head = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
};

module.exports.register = async event => {
  try {
    const imagePath = await resizeHandler._process(event)
    const URL = `http://${process.env.BUCKET}.s3-website.${process.env.REGION}.amazonaws.com`

    return {
      headers: { ...head ,'location': `${URL}/${imagePath}` },
      statusCode: 301,
      body: ''
    }
  } catch (error) {
    console.log(error)
    return new Error(error)
  }
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};


class ResizerHandler {
  constructor(){ }

  async _process(event) {
    const { size, image } = event.pathParameters
    return await this.resize(size, image)
  }

  async resize(size, path) {
    try {
      const sizeArray = size.split('x')
      const width = parseInt(sizeArray[0])
      const height = parseInt(sizeArray[1])
      const Key = path
      const newKey = '' + width + 'x' + height + '/' + path

      const Bucket = process.env.BUCKET
      const streamResize = sharp()
        .resize(width, height)
        .toFormat('png')

      const readStream = s3Handler.readStream({ Bucket, Key })
      const { writeStream, uploaded } = s3Handler.writeStream({ Bucket, Key: newKey })

      //data streaming
      readStream
        .pipe(streamResize)
        .pipe(writeStream)

      await uploaded
      return newKey
    } catch (error) {
      throw new Error(error)
    }
  }
}

AWS.config.region = 'eu-west-1'
const S3 = new AWS.S3()

class S3Handler {
  constructor() { }

  readStream({ Bucket, Key }) {
    return S3.getObject({ Bucket, Key }).createReadStream()
  }

  writeStream({ Bucket, Key }) {
    const passThrough = new stream.PassThrough()
    return {
      writeStream: passThrough,
      uploaded: S3.upload({
        ContentType: 'image/jpeg',
        Body: passThrough,
        Bucket,
        Key
      }).promise()
    }
  }
}