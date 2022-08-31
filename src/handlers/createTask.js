"use strict";

const documentClient = require('../utils/database')
const response = require('../utils/response')

const TASKS_TABLE_NAME = process.env.TASKS_TABLE_NAME;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  const data = JSON.parse(event.body);

  try {
    const params = {
      TableName: TASKS_TABLE_NAME,
      Item: {
        id: data.id,
        title: data.title,
        desc: data.desc,
      },
      ConditionExpression: "attribute_not_exists(id)",
    };

    await documentClient.put(params).promise();
    callback(null, response.send(201, data));
  } catch (error) {
    console.error(JSON.stringify(error));
    callback(null, response.send(500, { err: error.message }));
  }
};
