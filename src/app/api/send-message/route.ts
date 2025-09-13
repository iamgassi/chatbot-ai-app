import { getGeminiMessages } from "@/helpers/getGeminiResponse";
import serverClient from "@/lib/serverClient";
import { INSERT_MESSAGE } from "graphql/mutations";
import { GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID } from "graphql/queries";
import { NextRequest, NextResponse } from "next/server";
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from "types/types";

export async function POST(request: NextRequest) {
    try {
        const { content, chat_session_id, chatbot_id, name, email } = await request.json();
        // fetch chatbot characteristics
        const { data } = await serverClient.query<GetChatbotByIdResponse, GetChatbotByIdVariables>({
            query: GET_CHATBOT_BY_ID,
            variables: { id: chatbot_id },
        })
    
        const chatbot = data.chatbots;
    
        if(!chatbot){
           return NextResponse.json({ error: "Chatbot not found" }, { status: 404 });
        }
    
        // fetch chat session messages
        const { data : messageData } = await serverClient.query({
            query: GET_MESSAGES_BY_CHAT_SESSION_ID,
            variables: { chat_session_id },
            fetchPolicy: "no-cache"
        })
    
        const previousMessages = messageData.chat_sessions.messages;
    
        const formattedMessages = previousMessages.map((msg: any) => ({
            role : msg.sender === 'ai' ? 'model' : 'user',
            parts: [
                { text: msg.content }
            ]
        }))
    
        const systemPropmt = chatbot.chatbot_characteristics.map((char) => char.content).join(" + ");
    
        // for openai
        // const messages = [
        //     {
        //         role: "system",
        //         name: "system",
        //         content: `You are a helpful assistant talking to ${name}.If a generic question is asked which is not relevant or in the same scope or same domain as the points in mentioned in the key information section. Kindly inform the user there only allowed to search for the specificed content. Use Emoji's where possible. Here is some key information that you need to aware of, these are elements you may be asked about: ${systemPropmt}`
        //     },
        //     ...formattedMessages,
        //     {
        //         role: "user",
        //         name: name,
        //         content: content
        //     }
        // ]
    
        const systemInstruction = `You are a helpful assistant talking to ${name}.If a generic question is asked which is not relevant or in the same scope or same domain as the points in mentioned in the key information section. Kindly inform the user there only allowed to search for the specificed content. Use Emoji's where possible. Think as you don't know anything outside of the key information section. Here is some key information that you need to aware of, these are elements you may be asked about: ${systemPropmt}.`
    
        const prompt = {
            contents: [...formattedMessages, { 
                role: 'user', 
                parts: [
                    { text: content } // The user's new message
                ]
            }],
            systemInstruction: { role: 'system', content: systemInstruction }
        }
        const aiResponse = await getGeminiMessages(prompt)
        if(!aiResponse){
            return NextResponse.json({
                id: Date.now() + 1,
                content: 'Failed to get response from AI',
            })
        }
    
        await serverClient.mutate({
            mutation: INSERT_MESSAGE,
            variables: { chat_session_id, content, sender: 'user' },
        })
    
        const aiMessage = await serverClient.mutate({
            mutation: INSERT_MESSAGE,
            variables: { chat_session_id, content: aiResponse.message, sender: 'ai' },
        })
    
        return NextResponse.json({ 
            id: aiMessage.data.insertMessages.id, 
            content: aiMessage.data.insertMessages.content 
        });
    } catch (error) {
        return NextResponse.json({ error: `Failed to send message: ${error}` }, { status: 500 });
    }

}