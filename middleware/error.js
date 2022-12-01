const errorHandler = (error, res) => {
  return res.status(400).json({
    err: {
      code: error,
      message: `${error}`,
    },
  });
};

module.exports = errorHandler;
