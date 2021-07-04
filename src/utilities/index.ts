import api from '../feathers';

export const environmentsMap = {
  Development: 'dev',
  QA: 'qa',
  Staging: 'staging',
  Demo: 'demo',
  Production: 'prod'
};

export const createBucketFlow = async (bucketName: string, environment: string, cloudfront: boolean): Promise<Record<string, any>> => {
  const bucket = await api.service('aws/bucket').create({ bucket_name: bucketName });
  const policy = await api.service('aws/policy').create({ bucket_name: bucketName });
  const iamUser = await api.service('aws/iam-user').create({ bucket_name: bucketName, policy_arn: policy.arn });
  const accessKeys = await api.service('aws/access-keys').create({ iam_user_name: iamUser.name });
  let distribution = null

  if (cloudfront) {
    distribution = await api.service('aws/cloudfront').create({ bucket_name: bucketName });
  }
  
  return {
    environment,
    bucket,
    policy,
    iamUser,
    accessKeys,
    cloudfront: distribution,
  };
};
