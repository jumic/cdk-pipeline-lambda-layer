import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pipelines from 'aws-cdk-lib/pipelines';
import { Application } from './application';

export class PipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new pipelines.CodePipeline(this, 'Pipeline', {
      synth: new pipelines.ShellStep('Synth', {
        input: pipelines.CodePipelineSource.connection('jumic/cdk-pipeline-lambda-layer', 'canary', {
          connectionArn:
            'arn:aws:codestar-connections:eu-central-1:352770552266:connection/f10d531d-7adf-45ab-811d-fa114d9e518c',
        }),
        commands: ['npm ci', 'npm run build', 'npx cdk synth'],
      }),
    });

    pipeline.addStage(
      new Application(this, 'Dev', {
        env: {
          account: '352770552266',
          region: 'eu-central-1',
        },
      })
    );
    
  }
}
