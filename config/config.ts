const environments = {
   qa: 'https://practicetestautomation.com/practice-test-login',
   stage: 'https://practicetestautomation.com/practice-test-login',
   prod: 'https://example.com',
   tpqa: 'https://qa-iibfpro.esdsconnect.com/application/candidate/create-account/U2FsdGVkX1-6gHeAgOIYVuhByTU7upxGRDHQnrLhOJ8',
} as const; // <-- ensures keys are literal types

type EnvKey = keyof typeof environments;

const envFromEnv = (process.env.ENV || 'prod').toLowerCase() as EnvKey;

// Fallback to 'qa' if envFromEnv is not in environments
const ENV: EnvKey = (envFromEnv in environments ? envFromEnv : 'prod') as EnvKey;

export const config = {
  baseURL: environments[ENV],
  credentials: {
    username: 'admin',
    password: 'admin123'
  },
  timeouts: {
    short: 5000,
    medium: 10000,
    long: 30000
  }
};

