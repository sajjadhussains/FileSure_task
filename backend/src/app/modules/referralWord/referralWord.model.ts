// models/referralWord.model.ts
import { Schema, model } from "mongoose";
import { TReferralWord } from "./referralWord.interface";

const referralWordSchema = new Schema<TReferralWord>(
  {
    referralWord: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

export const ReferralWord = model("ReferralWord", referralWordSchema);
