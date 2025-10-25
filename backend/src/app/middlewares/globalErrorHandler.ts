/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import { ZodError, ZodIssue } from "zod";
import { TErrorSource } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidateError from "../errors/handleValidateError";
import handleCastError from "../errors/handleCastError";
import handleDuplicateError from "../errors/handleDuplicateError";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  //setting default values
  let statusCode = 500;
  let message = err.message || "Something went wrong";

  let errorSources: TErrorSource = [
    {
      path: "",
      message: "",
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError?.errorSources as TErrorSource;
  } else if (err.name === "ValidationError") {
    const simplifiedError = handleValidateError(err);
    message = simplifiedError?.message;
    statusCode = simplifiedError?.statusCode;
    errorSources = simplifiedError?.errorSources;
  } else if (err.name === "CastError") {
    const simplifiedError = handleCastError(err);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (err.code === 11000) {
    const simplifiedError = handleDuplicateError(err);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err.message,
      },
    ];
  }
  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_env === "production" ? "" : err?.stack,
  });
};

export default globalErrorHandler;
