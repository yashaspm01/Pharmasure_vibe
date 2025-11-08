'use server';
/**
 * @fileOverview A medication reminder setup AI agent.
 *
 * - setupMedicationReminder - A function that handles the medication reminder setup process.
 * - MedicationReminderInput - The input type for the setupMedicationReminder function.
 * - MedicationReminderOutput - The return type for the setupMedicationReminder function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MedicationReminderInputSchema = z.object({
  medicationName: z.string().describe('The name of the medication.'),
  dosage: z.string().describe('The dosage of the medication (e.g., 100mg, 5ml).'),
  frequency: z.string().describe('How often the medication should be taken (e.g., once a day, twice a day, every 4 hours).'),
  additionalInstructions: z.string().optional().describe('Any additional instructions for taking the medication (e.g., with food, before bed).'),
});
export type MedicationReminderInput = z.infer<typeof MedicationReminderInputSchema>;

const MedicationReminderOutputSchema = z.object({
  success: z.boolean().describe('Whether the reminder setup was successful.'),
  message: z.string().describe('A message indicating the result of the reminder setup.'),
  scheduledTimes: z.array(z.string()).describe('A list of specific times the reminders are scheduled for each day in 24-hour format (e.g., ["08:00", "20:00"]).'),
});
export type MedicationReminderOutput = z.infer<typeof MedicationReminderOutputSchema>;

export async function setupMedicationReminder(input: MedicationReminderInput): Promise<MedicationReminderOutput> {
  return medicationReminderSetupFlow(input);
}

const prompt = ai.definePrompt({
  name: 'medicationReminderSetupPrompt',
  input: {schema: MedicationReminderInputSchema},
  output: {schema: MedicationReminderOutputSchema},
  prompt: `You are a helpful assistant that helps users set up medication reminders.

  Based on the following information, determine the appropriate times to schedule the medication reminders.  Return the times in 24-hour format (e.g., ["08:00", "20:00"]).

  Medication Name: {{{medicationName}}}
  Dosage: {{{dosage}}}
  Frequency: {{{frequency}}}
  Additional Instructions: {{{additionalInstructions}}}

  Return a JSON object with the success status, a message indicating the result of the reminder setup, and a list of specific times the reminders are scheduled for.`,
});

const medicationReminderSetupFlow = ai.defineFlow(
  {
    name: 'medicationReminderSetupFlow',
    inputSchema: MedicationReminderInputSchema,
    outputSchema: MedicationReminderOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
