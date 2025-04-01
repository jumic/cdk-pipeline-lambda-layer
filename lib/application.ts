import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { LayerStack } from "./layer-stack";
import { LambdaStack } from "./lambda-stack";

export class Application extends Stage {
    constructor(scope: Construct, id: string, props?: StageProps) {
      super(scope, id, props);
  
      const layerStack = new LayerStack(this, 'LayerStack');
      new LambdaStack(this, 'LambdaStack', {
        layerVersion: layerStack.layerVersion,
      });

    }
  }