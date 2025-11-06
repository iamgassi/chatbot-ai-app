"use client";

import { usePathname } from "next/navigation";
import { Message } from "types/types";
import Avatar from "./Avatar";
import { UserCircle } from "lucide-react";
import ReactMarkDown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useRef } from "react";

const Messages = ({
  messages,
  chatbotName,
}: {
  messages: Message[];
  chatbotName: string;
}) => {
  const path = usePathname();
  const isReviewPage = path.includes("review-sessions");
  const ref = useRef<HTMLDivElement>(null)
  useEffect(()=>{
    if(ref.current){
        ref.current.scrollIntoView({behavior: 'smooth'})
    }
  },[messages])
  return (
    <div className="flex-1 flex flex-col overflow-y-auto space-y-10 py-10 px-5 bg-white rounded-lg">
      {messages?.map((message) => {
        const isSender = message.sender == "ai";
        return (
          <div
            key={message.id}
            className={`chat ${
              isSender ? "chat-start" : "chat-end"
            } relative space-x-5`}
          >
            {isReviewPage && (
              <p className="absolute -bottom-5 text-xs text-gray-500">
                sent {new Date(message.created_at).toLocaleString()}
              </p>
            )}
            <div className={`chat-image avatar w-10 ${!isSender && "-mr-4"}`}>
              {isSender ? (
                <Avatar
                  seed={chatbotName}
                  className="bg-white rounded-full border-2 w-12 h-12"
                />
              ) : (
                <UserCircle className="h-8 w-8 text-blue-500" />
              )}
            </div>
            <div
              className={`chat-bubble ${
                isSender ? "bg-blue-500" : "bg-gray-300"
              }`}
            >
              <ReactMarkDown
                remarkPlugins={[remarkGfm]}
                components={{
                  ul: (props) => (
                    <ul
                      {...props}
                      className="list-disc list-inside ml-5 mb-5"
                    />
                  ),
                  ol: (props) => (
                    <ol
                      {...props}
                      className="list-decimal list-inside ml-5 mb-5"
                    />
                  ),
                  h1: (props) => (
                    <h1 {...props} className="text-2xl font-bold mb-5" />
                  ),
                  h2: (props) => (
                    <h2 {...props} className="text-xl font-bold mb-5" />
                  ),
                  h3: (props) => (
                    <h3 {...props} className="text-lg font-bold mb-5" />
                  ),
                  table: (props) => (
                    <table
                      {...props}
                      className="table-auto w-full border-separate border-2 rounded-sm border-spacing-4 border-white mb-5"
                    />
                  ),
                  th: (props) => (
                    <th {...props} className="text-left underline" />
                  ),
                  p: (props) => (
                    <p
                      {...props}
                      className={`whitespace-break-spaces mb-5 ${
                        message.content === "Thinking..." && "animate-pulse"
                      } ${!isSender ? "text-gray-700" : "text-white"}`}
                    />
                  ),
                  a: (props) => (
                    <a
                      {...props}
                      target="_blank"
                      className="font-bold underline hover:bg-blue-400"
                      rel="noopener noreferrer"
                    />
                  ),
                }}
              >
                {message.content}
              </ReactMarkDown>
            </div>
            <div ref={ref}/>
          </div>
        );
      })}
    </div>
  );
};
export default Messages;
