import HttpStatusCode from "../exceptions/HttpStatusCode.js";

const errorHandler = (err, req, res, next) => {
  console.error("errorHandler", err.stack); // Log lỗi vào console
  res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    message: `${err.message}-----------1`,
    validationErrors: err.validationErrors || null, // Gửi lỗi validation nếu có
  });
};

export default errorHandler;
