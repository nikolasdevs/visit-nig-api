//Centralized error handling

const errorHandling = (err, req, res, next) => {
  console.error(err.stack);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: statusCode,
    message: err.message,
    error: err.message,
  });
};

export default errorHandling;