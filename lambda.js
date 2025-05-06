const serverless = require('serverless-http');
const app = require('./src/app');

// Create the serverless handler
const handler = serverless(app);

// Export the handler function for AWS Lambda
module.exports.handler = async (event, context) => {
  // You can add any pre-processing logic here if needed
  return await handler(event, context);
};