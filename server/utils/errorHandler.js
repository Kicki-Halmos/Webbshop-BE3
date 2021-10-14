const sendError = ((err, req, res, next) => {
  const { statusCode = 500 } = err;
  const { message = 'something went wrong!' } = err;
  res.status(statusCode).json({
    data: {
      message, statusCode,
    },
  });
});

module.exports = sendError;
