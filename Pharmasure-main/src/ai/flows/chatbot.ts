'use server';
/**
 * @fileOverview A chatbot AI agent for the PharmaSure app.
 *
 * - chatWithBot - The main function to interact with the chatbot.
 * - ChatMessage - The type for a single chat message.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { activeMedications, alerts, nextDosage, products, upcomingReminders, recentScans } from '@/lib/data';

// Define the schema for a single chat message
const ChatMessageSchema = z.object({
  role: z.enum(['user', 'model']),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

// Define the output schema for the chatbot
const ChatbotOutputSchema = ChatMessageSchema;
export type ChatbotOutput = z.infer<typeof ChatbotOutputSchema>;

// Export the main function to be called from the frontend
export async function chatWithBot(history: ChatMessage[]): Promise<ChatbotOutput> {
  return chatbotFlow(history);
}

// Define the prompt for the chatbot
const prompt = ai.definePrompt({
  name: 'chatbotPrompt',
  input: {schema: z.array(ChatMessageSchema)},
  output: {schema: ChatbotOutputSchema},
  prompt: `You are PharmaSure Assistant, a friendly and helpful AI chatbot for a pharmacy and medication reminder app. Your goal is to assist users by providing information about the app's features, guiding them, and analyzing their medication data.

  Your knowledge base includes the following information about the app and the user's current data. Use this context to answer questions accurately.

  **App Features:**
  - **Home:** Shows next dosage, active medications, and important alerts.
  - **My Meds:** A list of all the user's medications. Users can view details for each one.
  - **Scan:** Users can scan a prescription image or a medicine box using their camera or by uploading a photo. The app uses AI to identify the medication and suggest products.
  - **Reminders:** A calendar view to see medication schedules, set reminders, and configure notification settings.
  - **Profile/Settings:** Users can edit their personal details, manage expired medications for disposal, and switch between light and dark themes.
  - **Chatbot (You):** You can answer questions and provide reports.

  **User's Current Data (This is example data, use it to form your responses):**
  - **Next Dosage:** {{jsonStringify nextDosage}}
  - **Active Medications:** {{jsonStringify activeMedications}}
  - **Alerts:** {{jsonStringify alerts}}
  - **All Products/Medications:** {{jsonStringify products}}
  - **Upcoming Reminders:** {{jsonStringify upcomingReminders}}
  - **Recent Scans:** {{jsonStringify recentScans}}
  
  **Your Tasks:**
  1.  **Answer Feature Questions:** If a user asks what a feature does, explain it based on the description above.
  2.  **Provide Guidance:** If a user asks how to do something (e.g., "how do I set a reminder?"), guide them to the correct page (e.g., "Go to the Reminders tab to set up and customize your alerts.").
  3.  **Analyze and Report:** If a user asks for a summary or report of their health, analyze the provided user data. For example:
      - "Give me a health report": Summarize their active medications, mention any alerts (like low stock or expired meds), and list their upcoming reminders.
      - "What should I take next?": Look at the 'Next Dosage' and 'Upcoming Reminders' and tell them.
  4.  **Be Conversational and Concise:** Keep your answers friendly, clear, and to the point. Start with a friendly greeting but get straight to the answer.
  
  **IMPORTANT:**
  - DO NOT make up information. Base all your answers on the context provided above.
  - Your response MUST be a single JSON object matching the ChatMessage schema with the role 'model'.
  
  **Chat History:**
  {{#each history}}
  {{#if (eq role 'user')}}
  User: {{{content}}}
  {{/if}}
  {{#if (eq role 'model')}}
  You: {{{content}}}
  {{/if}}
  {{/each}}
  
  Now, based on the last user message, provide your response.`,
});

const chatbotFlow = ai.defineFlow(
  {
    name: 'chatbotFlow',
    inputSchema: z.array(ChatMessageSchema),
    outputSchema: ChatbotOutputSchema,
  },
  async history => {
    // For now, return a simple response
    // TODO: Implement proper AI integration
    const lastMessage = history[history.length - 1];
    if (lastMessage?.role === 'user') {
      return {
        role: 'model' as const,
        content: 'Hello! I am PharmaSure Assistant. How can I help you today?'
      };
    }
    return {
      role: 'model' as const,
      content: 'Hello! I am PharmaSure Assistant. How can I help you today?'
    };
  }
);
