// Central error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);

  let status = err.status || 500;
  if (err.name === 'ValidationError' || err.name === 'CastError') {
    status = 400;
  }

  res.status(status).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

module.exports = errorHandler;
