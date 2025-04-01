#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline';

const app = new cdk.App();
new PipelineStack(app, 'PipelineStack', {
  env: { account: '352770552266', region: 'eu-central-1' },
});