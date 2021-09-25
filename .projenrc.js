const { AwsCdkTypeScriptApp, web } = require('projen');

const project = new AwsCdkTypeScriptApp({
  defaultReleaseBranch: 'main',
  name: 'cdk-s3-website',
  authorAddress: 'code.leeek@gmail.com',
  authorName: 'Code Leeek',
  cdkVersion: '1.95.2',
  cdkVersionPinning: true,
  cdkDependencies: [
    '@aws-cdk/aws-s3-deployment',
    '@aws-cdk/aws-s3',
  ],
});

project.synth();

const frontendProject = new web.ReactTypeScriptProject({
  defaultReleaseBranch: 'main',
  outdir: 'frontend',
  parent: project,
  name: 'cdk-s3-website',
});

frontendProject.addTask('development', {
  description: 'Runs the application locally',
  exec: 'react-scripts start',
});

frontendProject.synth();