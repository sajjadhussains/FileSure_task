// utils/generateReferralWord.ts

import { ReferralWord } from "./referralWord.model";

export const generateUniqueReferralWord = async () => {
  let unique = false;
  let word = "";

  while (!unique) {
    // Example: random 6-letter uppercase code
    word = Math.random().toString(36).substring(2, 8).toUpperCase();

    const existing = await ReferralWord.findOne({ referralWord: word });
    if (!existing) unique = true;
  }

  const newReferral = await ReferralWord.create({ referralWord: word });
  return newReferral._id;
};
