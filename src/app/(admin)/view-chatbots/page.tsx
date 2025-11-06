import Avatar from "@/components/Avatar";
import { Button } from "@/components/ui/button";
import serverClient from "@/lib/serverClient";
import { auth } from "@clerk/nextjs/server";
import { GET_CHATBOTS_BY_USER } from "graphql/queries";
import Link from "next/link";
import { GetChatbotsByUserData, GetChatbotsByUserVariables } from "types/types";

const page = async () => {
  const { userId } = await auth();
  if (!userId)
    return (
      <div className="flex flex-col justify-center items-center bg-white p-10 rounded-md m-10">
        <h1 className="text-md lg:text-xl font-semibold italic">
          Please log in first to view your chatbots
        </h1>
      </div>
    );
  const {
    data: { chatbotsByUserId },
  } = await serverClient.query<
    GetChatbotsByUserData,
    GetChatbotsByUserVariables
  >({
    query: GET_CHATBOTS_BY_USER,
    variables: { clerk_user_id: userId },
  });

  const sortedChatbots = chatbotsByUserId.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  return (
    <div className="flex-1 pb-20 p-10">
      <h1 className="text-xl lg:text-2xl font-semibold mb-5">
        Active Chatbots
      </h1>
      {sortedChatbots.length === 0 && (
        <div className="flex flex-col w-full justify-center items-center bg-white p-10 rounded-md m-10">
          <p>
            You have not created any chatbots yet. Click on the button below to
            create your first chatbot.
          </p>
          <Link
            href="/create-chatbot"
            className="flex items-center justify-center mt-5"
          >
            <Button>Create Chatbot</Button>
          </Link>
        </div>
      )}
      <ul className="flex flex-col gap-5">
        {sortedChatbots.map((chatbot) => (
          <Link key={chatbot.id} href={`/edit-chatbot/${chatbot.id}`}>
            <li className="relative p-10 border rounded-md max-w-3xl bg-white">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Avatar seed={chatbot.name} />
                  <h3 className="text-xl font-bold">{chatbot.name}</h3>
                </div>
                <p className="absolute top-5 right-5 text-xs text-gray-500">
                  Created: {new Date(chatbot.created_at).toLocaleString()}
                </p>
              </div>
              <hr className="mt-2" />
              <div className="grid grid-cols-2 gap-10 md:gap-5 p-5">
                <h3 className="text-sm md:text-md font-semibold">
                  Characteristics :{" "}
                </h3>
                <ul className="flex flex-col gap-2 text-xs">
                  {!chatbot.chatbot_characteristics.length && (
                    <p className="text-gray-500">
                      No chatbot characteristics added yet.
                    </p>
                  )}
                  {chatbot.chatbot_characteristics.map((characteristic) => (
                    <li
                      key={characteristic.id}
                      className="list-disc break-words text-gray-500"
                    >
                      {characteristic.content}
                    </li>
                  ))}
                </ul>
                <h3 className="text-sm md:text-md font-semibold">
                  Chat Sessions :{" "}
                </h3>
                <ul className="flex flex-col gap-2 text-xs">
                  {!chatbot.chat_sessions.length && (
                    <p className="text-gray-500">
                      No chat sessions available yet.
                    </p>
                  )}
                  {chatbot.chat_sessions.map((session) => (
                    <li
                      key={session.id}
                      className="list-disc break-words text-gray-500"
                    >
                      {session.guestId
                        ? `Guest ID: ${session.guestId}`
                        : "No guest ID"}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
export default page;
