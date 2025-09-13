import { genAIModel } from "@/lib/gemini";
interface ApiResponse {
    success: boolean;
    message: string;
}

export async function getGeminiMessages(prompt:any) : Promise<ApiResponse> {
    try {
        if(!prompt){
            return {
                success: false,
                message: "Prompt is required"
            }
        }
        const { response } = await genAIModel.generateContent(prompt);
        const text = response.text();

        return {
            success: true,
            message: text
        }
    } catch (error) {
        return {
            success: false,
            message: `Gemini failed to response ${error}`
        }
    }
}