module.exports = (err, req, res, next) => {
  if (err) {
    console.error(err);

    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error'
    });
  }
  next();
};
