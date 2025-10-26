"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralWord = void 0;
// models/referralWord.model.ts
const mongoose_1 = require("mongoose");
const referralWordSchema = new mongoose_1.Schema({
    referralWord: { type: String, unique: true, required: true },
}, { timestamps: true });
exports.ReferralWord = (0, mongoose_1.model)("ReferralWord", referralWordSchema);
