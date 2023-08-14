const api = {
  localApiBaseURL: '/api',
  jsonApiBaseURL: 'https://stg-api.foia.gov/api',
  requestApiBaseURL: 'https://stg-api.foia.gov/api',
  wizardApiURL: 'https://stg-api.foia.gov/doj-foia/models/ZBA2ow0/predict',
  // These are not secret, refer to https://github.com/18F/beta.foia.gov/tree/develop/docs/foia-api.md
  jsonApiKey: 'Ear1funbgPVsgIAvRDZQK4yHq1XrLnrgfUBJM0Su',
};

export default {
  api,
  appEnv: 'staging',
};
