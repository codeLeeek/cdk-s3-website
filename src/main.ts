import * as s3 from '@aws-cdk/aws-s3';
import * as s3deploy from '@aws-cdk/aws-s3-deployment';
import { App, CfnOutput, Construct, RemovalPolicy, Stack, StackProps } from '@aws-cdk/core';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const siteBucket = new s3.Bucket(this, 'SiteBucket', {
      websiteIndexDocument: 'index.html',
      websiteErrorDocument: 'error.html',
      publicReadAccess: true,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ['*'],
          allowedHeaders: ['*'],
          exposedHeaders: ['ETag', 'x-amz-metadata-custom-header', 'Authorization', 'Content-Type', 'Accept'],
        },
      ],
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    //Deploy site contents to s3 bucket
    new s3deploy.BucketDeployment(this, 'BucketDeployment', {
      sources: [s3deploy.Source.asset('./frontend/build')],
      destinationBucket: siteBucket,
    });

    new CfnOutput(this, 'bucketWebsiteUrl', {
      value: siteBucket.bucketWebsiteUrl,
    });
  }
}

const devEnv = {
  account: '829437827724',
  region: 'ap-southeast-2',
};

const app = new App();

new MyStack(app, 'my-stack-dev', { env: devEnv });

app.synth();