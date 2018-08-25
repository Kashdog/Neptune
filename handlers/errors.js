function handleError(err, req, res, next) {
  res.json({
    error: {
      status: err.status,
      message: err.message
    }
  })
}

module.exports = handleError;