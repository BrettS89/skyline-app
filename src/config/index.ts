const getUri = (env: string): string => {
  if (env === 'local') return 'http://localhost:3030';
  return 'http://localhost:3030';
};

export const url = getUri('local');
