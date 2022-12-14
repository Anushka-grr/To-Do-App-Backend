const errorHandler = (error, res) => {
  console.log("Error :", error);
  return res.status(500).json({
    err: {
      code: error,
      message: `${error}`,
    },
  });
};

module.exports = errorHandler;
