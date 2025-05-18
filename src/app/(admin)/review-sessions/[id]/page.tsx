import Messages from "@/components/Messages";
import serverClient from "@/lib/serverClient";
import { GET_CHAT_SESSION_MESSAGES } from "graphql/queries";
import {
  GetChatSessionMessagesVariables,
  GetChatSessionMessagesResponse,
} from "types/types";

export const dynamic = "force-dynamic";

const ReviewSessionsById = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  const {
    data: {
      chat_sessions: {
        id: chatSessionId,
        created_at,
        messages,
        chatbots: { name },
        guests: { name: guestName, email: guestEmail },
      },
    },
  } = await serverClient.query<
    GetChatSessionMessagesResponse,
    GetChatSessionMessagesVariables
  >({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: parseInt(id) },
  });

  return (
    <div className="p-10 pb-24 flex-1">
      <h1 className="text-xl lg:text-3xl font-semibold">Session Review</h1>
      <p className="font-light text-xs text-gray-500 mt-2">
        Started at {new Date(created_at).toLocaleString()}
      </p>
      <h2>
        Between {name} &{' '}
        <span className="font-bold">{guestName} ({guestEmail})</span>
      </h2>
      <hr className="my-10"></hr>
      <Messages messages={messages} chatbotName={name} />
    </div>
  );
};
export default ReviewSessionsById;
