const DynamoDB = require("aws-sdk/clients/dynamodb");
const documentClient = new DynamoDB.DocumentClient({
  region: process.env.REGION,
  maxRetries: 3,
  httpOptions: {
    timeout: 5000,
  },
});

module.exports = documentClient;