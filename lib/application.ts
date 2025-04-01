import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LayerStack } from "./layer-stack";
import { LambdaStack } from "./lambda-stack";
import * as ssm from 'aws-cdk-lib/aws-ssm';

export class Application extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      new LayerStack(this, 'LayerStack');
      new LambdaStack(this, 'LambdaStack');

    }
  }