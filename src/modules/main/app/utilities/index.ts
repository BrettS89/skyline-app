export const appTypes = [
  {
    name: 'Docker',
    value:'64bit Amazon Linux 2 v3.4.3 running Docker',
  },
  {
    name: 'Node.js',
    value: '64bit Amazon Linux 2 v5.4.3 running Node.js 14',
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
