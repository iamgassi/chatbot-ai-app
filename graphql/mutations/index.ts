import { gql } from "@apollo/client";

export const CREATE_CHATBOT = gql`
 mutation createChatbot($clerk_user_id: String!, $name: String!){
    insertChatbots(clerk_user_id: $clerk_user_id, name: $name){ id }
 }`;

export const REMOVE_CHARACTERISTIC = gql`
 mutation removeCharacteristic($id: Int!) {
   deleteChatbot_characteristics(id: $id) {
     id
   }
 }`;

export const ADD_CHARACTERISTIC = gql`
 mutation addCharacteristic($content: String!, $chatbot_id: Int!) {
   insertChatbot_characteristics(content: $content, chatbot_id: $chatbot_id) {
     id
   }
 }`;

export const REMOVE_CHATBOT = gql`
 mutation removeChatbot($id: Int!) {
   deleteChatbots(id: $id) {
     id
   }
 }`;

export const UPDATE_CHATBOT_NAME = gql`
 mutation updateChatbotName($id: Int!, $name: String!) {
   updateChatbots(id: $id, name: $name) {
     id
     name
   }
 }`;
