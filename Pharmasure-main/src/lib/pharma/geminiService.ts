
import { GoogleGenAI, Type } from "@google/genai";
import type { ScannedMedicationData } from './types';

const fileToGenerativePart = async (file: File) => {
    const base64EncodedDataPromise = new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result.split(',')[1]);
            } else {
                resolve('');
            }
        };
        reader.readAsDataURL(file);
    });
    return {
        inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    };
};

export const analyzeMedicationImage = async (file: File): Promise<ScannedMedicationData> => {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("GEMINI API_KEY environment variable not set");
    }
    const ai = new GoogleGenAI({ apiKey });

    const imagePart = await fileToGenerativePart(file);

    const prompt = `
      Analyze this image of a medication package. Extract the following information:
      1.  **name**: The brand or generic name of the medication.
      2.  **expiryDate**: The expiration date in YYYY-MM-DD format. If only month and year are visible, assume the last day of that month.
      3.  **stock**: The quantity or number of units (e.g., tablets, capsules).

      If a value is not clearly visible or cannot be determined, return null for that specific field.
      Return the result as a JSON object matching the provided schema.
    `;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [{ text: prompt }, imagePart] },
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING, nullable: true },
                        expiryDate: { 
                            type: Type.STRING, 
                            description: "Date in YYYY-MM-DD format",
                            nullable: true 
                        },
                        stock: { type: Type.NUMBER, nullable: true },
                    },
                },
            },
        });

        if (!response.text) {
            throw new Error("No response text from Gemini API");
        }
        const jsonString = response.text.trim();
        const parsedData = JSON.parse(jsonString) as ScannedMedicationData;
        return parsedData;

    } catch (error) {
        console.error("Gemini API Error:", error);
        throw new Error("Could not extract details from the image. Please enter them manually.");
    }
};
