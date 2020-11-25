const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  const errorMessage = {
    message: error.message,
    stack: error.stack,
  };
  if (process.env.NODE_ENV === "production") delete errorMessage.stack;
  res.json(errorMessage);
};

module.exports = {
  notFound,
  errorHandler,
};
