module.exports = (error, req, res, next) => {
  let status = error.status || 500;
  let message = error.message || "Internal Server Error";

  console.log(error);
  switch (error.name) {
    case "NotAuthenticated":
    case "JSONWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "Forbidden":
      status = 403;
      message = "Forbidden";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      status = 400;
      message = error.errors.map((el) => el.message);
      break;
    case "NotFound":
      status = 404;
      message = "Data Not Found!";
      break;
  }

  res.status(status).json({
    message: message,
  });
};
