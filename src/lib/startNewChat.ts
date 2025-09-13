import client from "graphql/apolloClient";
import { INSERT_CHAT_SESSION, INSERT_GUEST, INSERT_MESSAGE } from "graphql/mutations";

async function  startNewChat(
    guestName: string,
    guestEmail: string,
    chatbotId: number
) {
    try {
        // create a new guest entry
        const guestResult = await client.mutate({
            mutation: INSERT_GUEST,
            variables: {name: guestName, email: guestEmail}
        })
        const guestId = guestResult.data.insertGuests.id

        // new chat session
        const chatSessionResult = await client.mutate({
            mutation: INSERT_CHAT_SESSION,
            variables: { guest_id: guestId, chatbot_id: chatbotId } 
        })
        const chatSessionId: string = chatSessionResult.data.insertChat_sessions.id

        // insert initial message
        await client.mutate({
            mutation: INSERT_MESSAGE,
            variables: {
                chat_session_id: chatSessionId,
                sender: 'ai',
                content: `Welcome ${guestName}!\n How can I assist you today?`
            }
        })

        console.log('Successfull')
        return chatSessionId;
    } catch (error) {
        console.log("startNewChat::",error)
    }
}

export default startNewChat;