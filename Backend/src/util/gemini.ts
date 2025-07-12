import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

function bufferToBase64(buffer: Buffer): string {
  return buffer.toString("base64");
}
export async function getImageDescription(buffer: Buffer): Promise<{
    description: string;
    category: string;
  }> {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro " });
  
    const prompt = `Describe this image in one short sentence focusing on local issues like roads, water, electricity, sanitation, or garbage.
  
  Then classify it into one of the following categories:
  ["road", "water", "electricity", "sanitation", "garbage"]
  
  Respond in the following JSON format:
  {
    "description": "...",
    "category": "..."
  }
  `;
  
    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: bufferToBase64(buffer),
        },
      },
    ]);
  
    const response = await result.response;
    let text = response.text().trim();
  
    if (text.startsWith("```json")) {
      text = text.replace(/^```json/, "").replace(/```$/, "").trim();
    } else if (text.startsWith("```")) {
      text = text.replace(/^```/, "").replace(/```$/, "").trim();
    }
  
    try {
      const parsed = JSON.parse(text);
      return {
        description: parsed.description || "No description",
        category: parsed.category || "uncategorized",
      };
    } catch (err) {
      console.error("Failed to parse AI response:", text);
      throw new Error("AI response not parsable as JSON");
    }
  }
  