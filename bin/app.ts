#!/opt/homebrew/opt/node/bin/node
import * as cdk from 'aws-cdk-lib';
import { PipelineStack } from '../lib/pipeline';
import { LayerStack } from '../lib/layer-stack';
import { LambdaStack } from '../lib/lambda-stack';

const app = new cdk.App();
new PipelineStack(app, 'PipelineStack', {
  env: { account: '352770552266', region: 'eu-central-1' },
});

new LayerStack(app, 'LayerStack');
new LambdaStack(app, 'LambdaStack');
