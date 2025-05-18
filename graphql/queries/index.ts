import { gql } from "@apollo/client";

// it throwing error as error:: ApolloError: Server response was missing for query 'GetChatbotById'.

export const GET_CHATBOT_BY_ID = gql`
    query GetChatbotById($id: Int!) {
        chatbots(id: $id) {
            id
            name
            created_at
            chatbot_characteristics {
                content,
                id
            }
            chat_sessions {
                id
                created_at
                guest_id
                messages {
                    id
                    content
                    created_at
                }
            }
        }
    }
`;

export const GET_CHATBOTS_BY_USER = gql`
    query GetChatbotsByUser($clerk_user_id: String!) {
        chatbotsByUserId(clerk_user_id: $clerk_user_id) {
            id
            name
            created_at
            chatbot_characteristics {
                id,
                content,
                created_at
            }
            chat_sessions {
                id
                created_at
                guest_id
                messages {
                    id
                    content
                    created_at
                }
            }
        }
    }
`;

export const GET_CHATBOTS_BY_USER_MINIMAL = gql`
    query GetChatbotsByUser($clerk_user_id: String!) {
        chatbotsByUserId(clerk_user_id: $clerk_user_id) {
            id
            name
            chat_sessions {
                id
                created_at
                guests {
                    name
                    email
                }
            }
        }
    }
`;

export const GET_CHAT_SESSION_MESSAGES = gql`
    query GetChatSessionMessages($id: Int!) {
        chat_sessions(id: $id) {
            id
            created_at
            guests {
                name
                email
            }
            messages {
                id
                content
                created_at
                sender
            }
            chatbots {
                name
            }
        }
    }
`;
