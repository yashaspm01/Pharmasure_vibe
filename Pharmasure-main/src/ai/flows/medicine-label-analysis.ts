
'use server';

/**
 * @fileOverview An AI agent that extracts key details from a medicine label image using OCR.
 *
 * - analyzeMedicineLabel - A function that handles the medicine label analysis.
 * - MedicineLabelAnalysisInput - The input type for the analyzeMedicineLabel function.
 * - MedicineLabelAnalysisOutput - The return type for the analyzeMedicineLabel function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicineLabelAnalysisInputSchema = z.object({
  medicineImage: z
    .string()
    .describe(
      "A photo of a medicine label, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type MedicineLabelAnalysisInput = z.infer<typeof MedicineLabelAnalysisInputSchema>;

const MedicineLabelAnalysisOutputSchema = z.object({
  isMedicineLabel: z.boolean().describe('Whether the image appears to be a medicine label or box.'),
  medicineName: z.string().describe('The name of the medicine.'),
  strength: z.string().optional().describe('The strength of the medicine (e.g., 500mg, 10ml). This is often the same as dosage.'),
  manufacturer: z.string().optional().describe('The name of the company that manufactured the medicine.'),
  manufactureDate: z.string().describe('The manufacturing date found on the label (e.g., "Jan 2023", "01/23").'),
  expiryDate: z.string().describe('The expiry date found on the label (e.g., "Dec 2025", "12/25"). This field is required.'),
  batchNumber: z.string().optional().describe('The batch number of the medicine, often labeled as "B.No." or "Batch No."'),
});
export type MedicineLabelAnalysisOutput = z.infer<typeof MedicineLabelAnalysisOutputSchema>;

export async function analyzeMedicineLabel(
  input: MedicineLabelAnalysisInput
): Promise<MedicineLabelAnalysisOutput> {
  return medicineLabelAnalysisFlow(input);
}

const medicineLabelAnalysisPrompt = ai.definePrompt({
  name: 'medicineLabelAnalysisPrompt',
  input: {schema: MedicineLabelAnalysisInputSchema},
  output: {schema: MedicineLabelAnalysisOutputSchema},
  prompt: `You are an AI assistant specialized in analyzing medicine labels.

  Your first task is to determine if the provided image is a medicine label, box, or crimp part of a tablet strip.
  - If it is, set 'isMedicineLabel' to true and extract the details.
  - If it is NOT a medicine label (e.g., a picture of a car, a landscape, a person), set 'isMedicineLabel' to false and leave the other fields empty.


  Analyze the provided image and extract the following details:
  1. The name of the medicine.
  2. The strength of the medicine (e.g., 500mg, 10ml).
  3. The manufacturer's name.
  4. The manufacturing date.
  5. The expiry date. This is a required field.
  6. The batch number (often labeled as "B.No." or similar).


  Here is the image:
  {{media url=medicineImage}}

  Return a JSON object containing the extracted details. If a detail is not visible, return an empty string for that field.
  `,
});

const medicineLabelAnalysisFlow = ai.defineFlow(
  {
    name: 'medicineLabelAnalysisFlow',
    inputSchema: MedicineLabelAnalysisInputSchema,
    outputSchema: MedicineLabelAnalysisOutputSchema,
  },
  async input => {
    const {output} = await medicineLabelAnalysisPrompt(input);
    return output!;
  }
);
