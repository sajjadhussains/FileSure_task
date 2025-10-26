"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const config_1 = __importDefault(require("../config"));
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
const handleValidateError_1 = __importDefault(require("../errors/handleValidateError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = err.message || "Something went wrong";
    let errorSources = [
        {
            path: "",
            message: "",
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        message = simplifiedError.message;
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err.name === "ValidationError") {
        const simplifiedError = (0, handleValidateError_1.default)(err);
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        errorSources = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err.name === "CastError") {
        const simplifiedError = (0, handleCastError_1.default)(err);
        message = simplifiedError.message;
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
    }
    else if (err.code === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        message = simplifiedError.message;
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources;
    }
    else if (err instanceof Error) {
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
        stack: config_1.default.node_env === "production" ? "" : err === null || err === void 0 ? void 0 : err.stack,
    });
};
exports.default = globalErrorHandler;
