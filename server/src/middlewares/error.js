class ErrorMiddleware {
  handle(err, req, res, next) {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (
      err.name === "PrismaClientInitializationError" &&
      err.message.includes("Tenant or user not found")
    ) {
      statusCode = 503;
      message = "Database Infrastructure Hibernated. Please Restore the Supabase Project.";
      console.warn("[INFRASTRUCTURE ALERT]: Supabase Project is PAUSED. Connection Refused.");
    } else {
      console.error(err.stack);
    }

    res.status(statusCode).json({
      success: false,
      message,
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
    });
  }
}

export default new ErrorMiddleware();
