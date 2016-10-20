class ErrorHandler {
  static notFound(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  }

  static internal(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  }
  
}


module.exports = ErrorHandler;