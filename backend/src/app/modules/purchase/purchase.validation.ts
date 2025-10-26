import { z } from 'zod';

const purchaseValidationSchema = z.object({
  body: z.object({
    bookId: z.string(),
  }),
});

export const PurchaseValidations = {
  purchaseValidationSchema,
};
