import serverClient from "@/lib/serverClient";
import { GET_CHAT_SESSION_MESSAGES } from "graphql/queries";
import {
  GetChatSessionMessagesVariables,
  GetChatSessionMessagesResponse,
} from "types/types";

export const dymanic = "force-dynamic";

const ReviewSessionsById = async ({ params : { id } }: { params: { id: string } }) => {
//   const {
//     data: {
//       chat_sessions: {
//         id: chatSessionId,
//         created_at,
//         messages,
//         chatbots: { name },
//         guests: { name: guestName, email: guestEmail },
//       },
//     },
//   } 
  const { data } = await serverClient.query<
    GetChatSessionMessagesResponse,
    GetChatSessionMessagesVariables
  >({
    query: GET_CHAT_SESSION_MESSAGES,
    variables: { id: parseInt(id) },
  });

  console.log("data::", data);
  return (
    <div className="p-10 pb-24 flex-1">
      <h1 className="text-xl lg:text-3xl font-semibold">Session Review {id}</h1>
      <p className="font-light text-xs text-gray-500 mt-2">
        {/* Started at {new Date(created_at).toLocaleString()} */}
      </p>
      <h2>
        {/* Between {name} &{' '} */}
        <span className="font-bold">{/* {guestName} ({guestEmail}) */}</span>
      </h2>
    </div>
  );
};
export default ReviewSessionsById;
