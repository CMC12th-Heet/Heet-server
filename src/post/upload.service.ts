import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadService {
  private readonly s3;

  constructor() {
    AWS.config.update({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    this.s3 = new AWS.S3();
  }

  async uploadImage(file: Express.Multer.File) {
    console.log('in');
    console.log(file);
    const key = `${Date.now() + file.originalname}`; // uuid?
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
    };
    const result = await this.s3.upload(params).promise();
    return result.Location;
  }
}
