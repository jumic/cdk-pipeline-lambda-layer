import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class LayerStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const layer = new lambda.LayerVersion(this, 'MyLayer', {
      compatibleRuntimes: [lambda.Runtime.PYTHON_3_13],
      code: lambda.Code.fromAsset('src/layer'),
    });

    new ssm.StringParameter(this, 'LayerArn', {
      parameterName: 'layer-arn',
      stringValue: layer.layerVersionArn,
    });

  }
}
