import { z } from 'zod';

// Define a Zod schema for each type from '@/lib/types' to ensure type safety in the flow.
const UserProfileSchema = z.object({
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
    age: z.number().optional(),
    gender: z.string().nullable(),
    healthIssues: z.array(z.string()).optional(),
    // Omit fields that are not relevant for the report
}).passthrough(); // Use passthrough to allow other fields from the original type

const MedicationSchema = z.object({
    id: z.string(),
    name: z.string(),
    daysLeft: z.number(),
});

const AlertSchema = z.object({
    id: z.string(),
    title: z.string(),
    subtitle: z.string(),
    type: z.enum(['error', 'warning']),
});

const DisposalRecordSchema = z.object({
    id: z.string(),
    medName: z.string(),
    disposalDate: z.string(),
    method: z.string(),
    status: z.string(),
});

const NextDosageSchema = z.object({
    medication: z.string(),
    instruction: z.string(),
    time: z.string(),
}).nullable();

const HealthStatsSchema = z.object({
    totalMeds: z.number(),
    activeMeds: z.number(),
    adherenceRate: z.number(),
    missedDoses: z.number(),
    disposals: z.number(),
    improvementScore: z.number(),
});

// Define the input schema for the AI flow
export const HealthReportInputSchema = z.object({
  userProfile: UserProfileSchema,
  healthStats: HealthStatsSchema,
  medications: z.array(MedicationSchema),
  alerts: z.array(AlertSchema),
  disposalHistory: z.array(DisposalRecordSchema),
  nextDosage: NextDosageSchema.optional(),
});
export type HealthReportInput = z.infer<typeof HealthReportInputSchema>;

// Define the output schema for the AI flow
export const HealthReportOutputSchema = z.object({
  patientOverview: z.string().describe("A brief, one-paragraph summary of the patient's profile and key health stats."),
  adherenceAnalysis: z.string().describe("A detailed analysis of medication adherence, mentioning the adherence rate, missed doses, and overall consistency. Provide an encouraging tone."),
  keyInsightsAndAlerts: z.string().describe("A summary of critical alerts, such as low stock or expired medications, and any other important insights derived from the user's data."),
  disposalSummary: z.string().describe("A summary of the user's medication disposal activity, highlighting responsible disposal practices."),
  recommendations: z.string().describe("Actionable recommendations for the user to improve their health management, based on all the provided data. Suggest specific actions they can take within the app."),
});
export type HealthReportOutput = z.infer<typeof HealthReportOutputSchema>;
