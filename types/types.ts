export interface Chatbot {
  id: number;
  name: string;
  clerk_user_id: string;
  chatbot_characteristics: ChatbotCharacteristics[];
  created_at: Date;
  chat_sessions: ChatSession[];
}

export interface ChatbotCharacteristics {
  id: number;
  chatbot_id: number;
  content: string;
  created_at: Date;
}

export interface Guest {
    id: number;
    name: string;
    email: string;
    created_at: Date;
}
export interface ChatSession {
  id: string;
  chatbot_id: number;
  guestId: number | null;
  created_at: Date;
  guests: Guest;
}

export interface Message {
    id: number;
    chat_session_id: number;
    sender: 'ai' | 'user';
    created_at: Date;
    content: string;
}

export interface GetChatbotByIdResponse {
    chatbots: Chatbot;
}

export interface GetChatbotByIdVariables {
    id: string;
}

export interface GetChatbotsByUserData {
    chatbotsByUserId: Chatbot[];
}

export interface GetChatbotsByUserVariables {
    clerk_user_id: string;
}

export interface GetChatSessionMessagesVariables {
    id: number;
}

export interface GetChatSessionMessagesResponse {
    chat_sessions: {
        id: number;
        created_at: Date;
        messages: Message[];
        chatbots: { name : string };
        guests : { name: string; email: string };
    };
}