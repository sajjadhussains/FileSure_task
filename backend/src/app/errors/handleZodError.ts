import { TErrorSource, TGenericErrorResponse } from "../interface/error";
import { ZodError } from "zod";

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSource = err.issues.map((issue) => {
    return {
      path: issue?.path[issue.path.length - 1]?.toString() || "",
      message: issue.message,
    };
  });

  const statusCode = 400;
  return {
    statusCode,
    message: "Zod Validation Error",
    errorSources,
  };
};

export default handleZodError;
