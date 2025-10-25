/* eslint-disable @typescript-eslint/no-explicit-any */
import { TErrorSource } from "../interface/error";

const handleDuplicateError = (err: any) => {
  const extractedMessage = (err.message.match(/dup key: { name: "([^"]+)" }/) ||
    [])[1];

  const errorSources: TErrorSource = [
    {
      path: "",
      message: `${extractedMessage} already exists`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: "Duplicate Error",
    errorSources,
  };
};

export default handleDuplicateError;
