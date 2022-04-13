import * as cdk from '@aws-cdk/core';
import { MyLambdaStack } from './my-pipeline-lambda-stack';
import { BlogGlueWorkFlowStack } from '../lib/blog-glue-workflow-stack';
import { RedshiftVpcStack } from '../lib/blog-redshift-vpc-stack';

export class MyPipelineAppStage extends cdk.Stage {
    
    constructor(scope: cdk.Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
      const app = new cdk.App();
  
      const lambdaStack = new MyLambdaStack(this, 'LambdaStack');  
          
      const workflow_stack = new BlogGlueWorkFlowStack(app, 'workflow-stack', {
        stackName: 'workflow-stack',
        description: 'creates the Glue workflow, Crawlers, Jobs and triggers'
      });
      
      const redshift_vpc_stack = new RedshiftVpcStack(app, 'redshift-vpc-stack', {
        glueRoleGrantSecretRead: workflow_stack.glueRole,
        stackName: 'redshift-vpc-stack',
        description: 'creates the VPC, Glue Connection, and Redshift cluster'
      });

    }
}