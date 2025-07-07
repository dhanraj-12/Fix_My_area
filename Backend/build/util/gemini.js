"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageDescription = getImageDescription;
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
function bufferToBase64(buffer) {
    return buffer.toString("base64");
}
function getImageDescription(buffer) {
    return __awaiter(this, void 0, void 0, function* () {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `Describe this image in one short sentence focusing on local issues like roads, water, electricity, sanitation, or garbage.
  
  Then classify it into one of the following categories:
  ["road", "water", "electricity", "sanitation", "garbage"]
  
  Respond in the following JSON format:
  {
    "description": "...",
    "category": "..."
  }
  `;
        const result = yield model.generateContent([
            { text: prompt },
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: bufferToBase64(buffer),
                },
            },
        ]);
        const response = yield result.response;
        let text = response.text().trim();
        // ✅ Clean Markdown code block if present
        if (text.startsWith("```json")) {
            text = text.replace(/^```json/, "").replace(/```$/, "").trim();
        }
        else if (text.startsWith("```")) {
            text = text.replace(/^```/, "").replace(/```$/, "").trim();
        }
        try {
            const parsed = JSON.parse(text);
            return {
                description: parsed.description || "No description",
                category: parsed.category || "uncategorized",
            };
        }
        catch (err) {
            console.error("Failed to parse AI response:", text);
            throw new Error("AI response not parsable as JSON");
        }
    });
}
