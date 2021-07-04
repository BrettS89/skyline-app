export const appTypes = [
  {
    name: 'Node.JS',
    value: '64bit Amazon Linux 2 v5.4.1 running Node.js 14',
  }
];

export const environmentTypes = [
  {
    name: 'Elastic Beanstalk - single ec2 instance',
  },
  {
    name: 'Elastic Beanstalk - autoscale',
  },
];

export const getEnvironmentVariables = () => {
  return [];
};

export const defaultProviderStatus = {
  endpointUrl: 'Generating...',
  status: 'Fetching...',
  health: 'grey'
};
