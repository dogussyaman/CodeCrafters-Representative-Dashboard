"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { systemPrompt } from "./dummy";



export async function sendMessageAction(message: string, keyType: 'key1' | 'key2') {
    const key = keyType === 'key1'
        ? process.env.GEMINI_API_KEY
        : process.env.GEMINI_API_KEY_2;

    if (!key) {
        console.error("GEMINI_API_KEY is not set");
        return {
            success: false,
            error: "Server configuration error: API key missing",
        };
    }

    try {
        const model = new GoogleGenerativeAI(key).getGenerativeModel({ model: "gemini-2.5-flash" });

        // Combine system prompt with user message
        const fullPrompt = `${systemPrompt}\n\nKullanıcı Sorusu: ${message}`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        return {
            success: true,
            text: text || "No response",
        };
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return {
            success: false,
            error: error.message || "Failed to process message",
        };
    }
}
