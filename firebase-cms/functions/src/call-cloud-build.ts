import * as functions from 'firebase-functions';
import { CloudBuildClient } from '@google-cloud/cloudbuild';

export const CallCloudBuild = functions
  .region('asia-northeast1')
  .https.onCall(async (data, context) => {
    await quickstart(
      'ng-prerender',
      'default-push-trigger-1',
      'master'
    )
  });


async function quickstart(
  projectId = 'YOUR_PROJECT_ID', // Your Google Cloud Platform project ID
  triggerId = 'YOUR_TRIGGER_ID', // UUID for build trigger.
  branchName = 'BRANCH_TO_BUILD' // Branch to run build against.
) {
  // Imports the Google Cloud client library

  // Creates a client
  const cb = new CloudBuildClient();

  // Starts a build against the branch provided.
  const [resp] = await cb.runBuildTrigger({
    projectId,
    triggerId,
    source: {
      projectId,
      dir: './',
      branchName,
    },
  });
  console.info(`triggered build for ${triggerId}`);
  const [build] = await resp.promise();

  const STATUS_LOOKUP = [
    'UNKNOWN',
    'Queued',
    'Working',
    'Success',
    'Failure',
    'Error',
    'Timeout',
    'Cancelled',
  ];

  if (!!build.steps && !!build.status) {
    for (const step of build.steps) {
      console.info(
        `step:\n\tname: ${step.name}\n\tstatus: ${STATUS_LOOKUP[build.status as any]}`
      );
    }
  } else {
    console.log('build is null');
  }
}