export const successResponse = (data, message = "Success") => ({
  success: true,
  message,
  data,
});

export const errorResponse = (message = "Error", error = null) => ({
  success: false,
  message,
  error: error?.message || error,
});
