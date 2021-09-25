const { AwsCdkTypeScriptApp, web } = require('projen');

const project = new AwsCdkTypeScriptApp({
  cdkVersion: '1.95.2',
  defaultReleaseBranch: 'main',
  name: 'cdk-s3-website',
  authorAddress: 'code.leeek@gmail.com',
  authorName: 'Code Leeek',
  cdkVersionPinning: true,
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