import { GoogleGenAI } from "@google/genai";
import { Scripture } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const systemInstruction = `You are a compassionate and knowledgeable Bible scholar. Your purpose is to provide comfort, guidance, and encouragement by sharing a single, relevant scripture verse from the Bible (King James Version). You do not engage in conversation, preach, or offer personal opinions. Based on the user's described situation, select the most fitting Bible verse. If the user's situation describes contemplating a sin or an unwise action, you must choose a scripture that offers a gentle but clear warning and guidance towards a better path. The explanation should compassionately address the temptation or poor judgment without being preachy, focusing on the wisdom and protection offered by the scripture. Return your response *only* as a valid JSON object with the following structure: { "verse": "The full text of the scripture.", "reference": "The book, chapter, and verse number (e.g., 'John 3:16').", "explanation": "A short, one-sentence explanation." }. Do not include any other text, markdown, greetings, or explanations outside of the JSON object.`;

export async function getScriptureForSituation(situation: string): Promise<Scripture> {
    const prompt = `User's situation: "${situation}"`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-preview-04-17",
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                temperature: 0.5,
                topP: 0.95,
                topK: 40,
            },
        });
        
        let jsonStr = response.text.trim();
        
        // Remove potential markdown fences
        const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
        const match = jsonStr.match(fenceRegex);
        if (match && match[2]) {
          jsonStr = match[2].trim();
        }

        try {
            const parsedData = JSON.parse(jsonStr) as Scripture;
            if (!parsedData.verse || !parsedData.reference || !parsedData.explanation) {
                throw new Error("Invalid JSON structure from API.");
            }
            return parsedData;
        } catch (e) {
            console.error("Failed to parse JSON response:", jsonStr, e);
            throw new Error("The response from the server was not in the expected format.");
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to fetch scripture from the service.");
    }
}