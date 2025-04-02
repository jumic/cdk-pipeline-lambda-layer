import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ssm from 'aws-cdk-lib/aws-ssm';
import * as codedeploy from 'aws-cdk-lib/aws-codedeploy';
import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';

export class LambdaStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const myFunction = new lambda.Function(this, 'MyFunction', {
      runtime: lambda.Runtime.PYTHON_3_13,
      handler: 'handler.lambda_handler',
      code: lambda.Code.fromAsset('src/lambda'),
      layers: [
        lambda.LayerVersion.fromLayerVersionArn(this, 'MyLayer',
          ssm.StringParameter.valueForStringParameter(this, 'layer-arn'))
      ]
    });

    const alias = new lambda.Alias(this, 'MyFunctionAlias', {
      aliasName: 'live',
      version: myFunction.currentVersion,
    });

    const alarm = new cloudwatch.Alarm(this, 'Errors', {
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
      threshold: 1,
      evaluationPeriods: 1,
      metric: alias.metricErrors(),
    });

    new codedeploy.LambdaDeploymentGroup(this, 'MyFunctionDeploymentGroup', {
      alias,
      deploymentConfig: codedeploy.LambdaDeploymentConfig.CANARY_10PERCENT_5MINUTES,
      alarms: [
        alarm,
      ],
    });

  }
}
