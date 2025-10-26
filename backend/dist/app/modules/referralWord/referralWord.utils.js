"use strict";
// utils/generateReferralWord.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueReferralWord = void 0;
const referralWord_model_1 = require("./referralWord.model");
const generateUniqueReferralWord = () => __awaiter(void 0, void 0, void 0, function* () {
    let unique = false;
    let word = "";
    while (!unique) {
        // Example: random 6-letter uppercase code
        word = Math.random().toString(36).substring(2, 8).toUpperCase();
        const existing = yield referralWord_model_1.ReferralWord.findOne({ referralWord: word });
        if (!existing)
            unique = true;
    }
    const newReferral = yield referralWord_model_1.ReferralWord.create({ referralWord: word });
    return newReferral._id;
});
exports.generateUniqueReferralWord = generateUniqueReferralWord;
