'use client';

import React, { useEffect, useState } from "react";
import { Chatbot } from "types/types";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import Avatar from "./Avatar";
import Link from "next/link";
import ReactTimeAgo from 'react-timeago'

const ChatbotSessions = ({ chatbots }: { chatbots: Chatbot[] }) => {
  const [sortedChatbots, setSortedChatbots] = useState<Chatbot[]>(chatbots);

  useEffect(() => {
    const sorted = chatbots.sort(
      (a, b) => b.chat_sessions.length - a.chat_sessions.length
    );

    setSortedChatbots(sorted);
  }, [chatbots]);

  return <div className="bg-white">
    <Accordion type="single" collapsible className="w-full">
        {sortedChatbots.map((chatbot) => {
        const hasSessions = chatbot.chat_sessions.length  > 0
        return (
            <AccordionItem key={chatbot.id} value={chatbot.name} className="px-10 py-5">
                {hasSessions ? (
                    <>
                        <AccordionTrigger>
                          <div className="flex text-left items-center w-full">
                            <Avatar seed={chatbot.name} className="w-10 h-10 mr-4"/>
                            <div className="flex flex-1 justify-between space-x-4">
                                <p className="font-bold px-2">{chatbot.name}</p>
                                <p className="pr-4 font-bold text-right">
                                    {chatbot.chat_sessions.length} chat sessions
                                </p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className='space-y-5 p-5 text-gray-100'>
                            {chatbot.chat_sessions.map((session) => (
                                <Link
                                    key={session.id}
                                    href={`/review-sessions/${session.id}`}
                                    className="relative p-5 bg-blue-500 text-white rounded-md block"
                                >
                                    <p className="text-lg font-bold">
                                       {session.guests.name || 'Anonymous'}
                                    </p>
                                    <p className="text-lg font-bold">
                                       {session.guests?.email || 'No email provided'}
                                    </p>
                                    <p className="absolute top-5 right-5 text-sm">
                                       <ReactTimeAgo date={new Date(session.created_at)} />
                                    </p>
                                </Link>
                            ))}
                        </AccordionContent>
                    </>
                ) : (
                    <p className="font-light">{chatbot.name} (no sessions)</p>
                )}
            </AccordionItem>
        );
        })}

    </Accordion>
  </div>;
};
export default ChatbotSessions;
