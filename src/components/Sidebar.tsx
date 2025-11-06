'use client';

import { BotMessageSquare, PencilLineIcon, SearchIcon } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="bg-white text-white p-5">
      <ul className="flex gap-5 lg:flex-col">
        <li className="flex-1">
          <Link
            href="/create-chatbot"
            className="hover:opacity-50 flex flex-col p-5 text-center lg:text-left lg:flex-row items-center gap-2 rounded-md bg-blue-500"
          >
            <BotMessageSquare className="w-6 h-6 lg:w-8 lg:h-8 " />
            <div className="hidden md:inline">
              <p className="text-xl">Create</p>
              <p className="text-sm">New Chatbot</p>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href="/view-chatbots"
            className="hover:opacity-50 flex flex-col p-5 text-center lg:text-left lg:flex-row items-center gap-2 rounded-md bg-blue-500"
          >
            <PencilLineIcon className="w-6 h-6 lg:w-8 lg:h-8 " />
            <div className="hidden md:inline">
              <p className="text-xl">Edit</p>
              <p className="text-sm">Chatbot</p>
            </div>
          </Link>
        </li>
        <li className="flex-1">
          <Link
            href="/review-sessions"
            className="hover:opacity-50 flex flex-col p-5 text-center lg:text-left lg:flex-row items-center gap-2 rounded-md bg-blue-500"
          >
            <SearchIcon className="w-6 h-6 lg:w-8 lg:h-8 " />
            <div className="hidden md:inline">
              <p className="text-xl">View</p>
              <p className="text-sm">Sessions</p>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
