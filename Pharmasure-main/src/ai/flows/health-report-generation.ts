
'use server';

/**
 * @fileOverview An AI agent that generates a comprehensive health report for a user.
 *
 * - generateHealthReport - The main function to trigger the report generation.
 */

import { ai } from '@/ai/genkit';
import { HealthReportInputSchema, HealthReportOutputSchema, type HealthReportInput, type HealthReportOutput } from '@/ai/schemas/health-report-schema';

// Re-export the type for external use
export type { HealthReportOutput };

// Export the main function to be called from the frontend
export async function generateHealthReport(input: HealthReportInput): Promise<HealthReportOutput> {
  return healthReportFlow(input);
}


const prompt = ai.definePrompt({
  name: 'healthReportPrompt',
  input: { schema: HealthReportInputSchema },
  output: { schema: HealthReportOutputSchema },
  prompt: `You are a health assistant AI for the PharmaSure app. Your task is to generate a comprehensive, easy-to-understand health report for a user based on the JSON data provided.

  The report should be structured into the following sections:
  1.  **Patient Overview**: Start with a brief summary of the user, including their name, age, and any noted health issues.
  2.  **Medication Adherence Analysis**: Analyze their adherence rate and missed doses. Offer encouragement and gentle reminders.
  3.  **Key Health Insights & Alerts**: Highlight any critical alerts (like expired medicine or low stock). Mention their next upcoming dose if available.
  4.  **Disposal Activity Summary**: Briefly summarize their disposal history, commending them for safe practices.
  5.  **Recommendations**: Provide actionable advice. If adherence is low, suggest setting up reminders in the 'Reminders' tab. If there are expired meds, guide them to the 'Profile > Disposal' section.

  Here is the user's data:
  - Profile: {{jsonStringify userProfile}}
  - Health Stats: {{jsonStringify healthStats}}
  - Active Medications: {{jsonStringify medications}}
  - Current Alerts: {{jsonStringify alerts}}
  - Disposal History: {{jsonStringify disposalHistory}}
  - Next Dosage: {{jsonStringify nextDosage}}

  Generate a report that is clear, empathetic, and helpful. Use markdown for formatting if necessary (e.g., bullet points for recommendations).
  `,
});

const healthReportFlow = ai.defineFlow(
  {
    name: 'healthReportFlow',
    inputSchema: HealthReportInputSchema,
    outputSchema: HealthReportOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
