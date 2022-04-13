import * as cdk from '@aws-cdk/core';
import { MyPipelineAppStage } from './my-pipeline-app-stage';
import { CodePipeline, CodePipelineSource, ShellStep, CodeBuildStep } from '@aws-cdk/pipelines';

export class MyPipelineStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
      super(scope, id);

      const pipeline = new CodePipeline(this, "BlogPipeline", {
        pipelineName: "BlogPipeline",
        // synth: new CodeBuildStep("SynthStep", {
        synth: new ShellStep('Synth', {
            input: CodePipelineSource.connection(
                "yanggf008/glue-workflow-aws-cdk",
                "main",
                {
                    connectionArn:
                        "arn:aws:codestar-connections:ap-southeast-2:373041827282:connection/51c36841-8b13-452e-87d6-502625aec113"
                }
            ),
            // installCommands: ["npm install -g aws-cdk@1.152.0"],
            commands: ["npm install -g aws-cdk@1.152.0", "npm install", "npm run build", "npx cdk synth"]
        })
    }); 

    // pipeline.addStage(new MyPipelineAppStage(this, "Deploy"));
      
    }
  }

