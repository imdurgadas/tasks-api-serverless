"use strict";

const documentClient = require('../utils/database')
const response = require('../utils/response')

const TASKS_TABLE_NAME = process.env.TASKS_TABLE_NAME;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const params = {
      TableName: TASKS_TABLE_NAME,
    };

    const notes = await documentClient.scan(params).promise();
    callback(null, response.send(200, notes));
  } catch (error) {
    console.error(JSON.stringify(error));
    callback(null, response.send(500, { err: error.message }));
  }
};
