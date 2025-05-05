import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
 mutation createChatbot($clerk_user_id: String!, $name: String!){
    insertChatbots(clerk_user_id: $clerk_user_id, name: $name){ id }
 }
`