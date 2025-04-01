import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('src/lambda'),
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(this, 'MyLayer',
          ssm.StringParameter.valueForStringParameter(this, 'layer-arn'))
      ]
    });

  }
}
