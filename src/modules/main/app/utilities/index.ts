export const appTypes = [
  {
    name: 'Docker',
    value:'64bit Amazon Linux 2 v3.4.4 running Docker',
  },
  {
    name: 'Node.js',
    value: '64bit Amazon Linux 2 v5.4.4 running Node.js 14',
  },
];

export const environmentTypes = [
  {
    name: 'EC2 Nano - $3.80/month',
    value: 't3.nano',
  },
  {
    name: 'EC2 Micro - $7.60/month',
    value: 't3.micro',
  },
  {
    name: 'EC2 Small - $15.19/month',
    value: 't3.small',
  },
  {
    name: 'EC2 Medium - $30.37/month',
    value: 't3.medium',
  },
  {
    name: 'EC2 Large - $60.74/month',
    value: 't3.large',
  },
  {
    name: 'EC2 X-Large - $121.47/month',
    value: 't3.xlarge',
  },
  {
    name: 'EC2 2X-Large - $242.94/month',
    value: 't3.2xlarge',
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

export const awsRegions = [
  {
    name: 'us-east-1 (Virginia)',
    value: 'us-east-1',
  },
  {
    name: 'us-east-2 (Ohio)',
    value: 'us-east-2',
  },
  {
    name: 'us-west-1 (N.California)',
    value: 'us-west-1',
  },
  {
    name: 'us-west-2 (Oregon)',
    value: 'us-west-2',
  },
];
