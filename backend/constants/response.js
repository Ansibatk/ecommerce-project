// response.js

// Success Response
export const successResponse = (res, statusCode, message = "Success", data = null) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

// Error Response
export const errorResponse = (res, statusCode, message = "Error") => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};
