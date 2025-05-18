import ChatbotSessions from "@/components/ChatbotSesions";
import serverClient from "@/lib/serverClient";
import { auth } from "@clerk/nextjs/server";
import { GET_CHATBOTS_BY_USER_MINIMAL } from "graphql/queries";
import {
  Chatbot,
  GetChatbotsByUserData,
  GetChatbotsByUserVariables,
} from "types/types";

const ReviewSessions = async () => {
  const { userId } = await auth();
  if (!userId)
    return (
      <div className="flex flex-col justify-center items-center bg-white p-10 rounded-md m-10">
        <h1 className="text-md lg:text-xl font-semibold italic">
          Please log in first to view your chat sessions
        </h1>
      </div>
    );

  const {
    data: { chatbotsByUserId },
  } = await serverClient.query<
    GetChatbotsByUserData,
    GetChatbotsByUserVariables
  >({
    query: GET_CHATBOTS_BY_USER_MINIMAL,
    variables: { clerk_user_id: userId },
  });

  const sortedChatbots: Chatbot[] = chatbotsByUserId.map((chatbot) => ({
    ...chatbot,
    chat_sessions: chatbot.chat_sessions.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    ),
  }));
  return (
    <div className="flex-1 px-10">
      <h1 className="text-xl lg:text-3xl font-semibold mt-10">Chat Sessions</h1>
      <h2 className="mb-5">
        Review your chat sessions the chat bots have had with your customers.
      </h2>
      <ChatbotSessions chatbots={sortedChatbots} />
    </div>
  );
};
export default ReviewSessions;
