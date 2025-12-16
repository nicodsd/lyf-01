import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateSmartMessage = async (
  providerName: string,
  serviceType: string,
  userIssue: string
): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      Actúa como un asistente útil. Un cliente quiere contratar a un profesional llamado "${providerName}" para un servicio de "${serviceType}".
      El problema del cliente es: "${userIssue}".
      
      Genera un mensaje de WhatsApp cortés, claro y directo que el cliente pueda enviar al profesional. 
      El mensaje debe saludar, explicar brevemente el problema y solicitar disponibilidad o presupuesto.
      No uses marcadores de posición, solo texto listo para enviar.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error generating smart message:", error);
    return `Hola ${providerName}, necesito tus servicios de ${serviceType}. Mi problema es: ${userIssue}. ¿Podrías contactarme?`;
  }
};
