exports.send = (statusCode, data) => {
  return {
    statusCode,
    body: JSON.stringify(data),
  };
};
