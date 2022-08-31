"use strict";

const documentClient = require('../utils/database')
const response = require('../utils/response')

const TASKS_TABLE_NAME = process.env.TASKS_TABLE_NAME;

module.exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const id = Number.parseInt(event.pathParameters.id);
  const data = JSON.parse(event.body);
  console.log(`Update Note received for id : ${id}`);
  try {
    const params = {
      TableName: TASKS_TABLE_NAME,
      Key: {
        id,
      },
      UpdateExpression: "set #title = :title , #desc = :desc",
      ExpressionAttributeNames: {
        "#title": "title",
        "#desc": "desc",
      },
      ExpressionAttributeValues: {
        ":title": data.title,
        ":desc": data.desc,
      },
      ConditionExpression: "attribute_exists(id)",
    };

    await documentClient.update(params).promise();
    callback(null, response.send(200, data));
  } catch (error) {
    console.error(JSON.stringify(error));
    callback(null, response.send(500, { err: error.message }));
  }
};

