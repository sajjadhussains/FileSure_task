"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    const extractedMessage = (err.message.match(/dup key: { name: "([^"]+)" }/) ||
        [])[1];
    const errorSources = [
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
exports.default = handleDuplicateError;
