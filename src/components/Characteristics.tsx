'use client';

import { ChatbotCharacteristics } from "types/types";
import { OctagonX } from "lucide-react";
import { useMutation } from "@apollo/client";
import { REMOVE_CHARACTERISTIC } from "graphql/mutations";
import { toast } from "sonner";

const Characteristics = ({ characteristics = [], }: { characteristics: ChatbotCharacteristics[]; }) => {
  const [removeCharacteristic] = useMutation(REMOVE_CHARACTERISTIC,{
    refetchQueries: [ "GetChatbotById" ],
  });

  const handleRemoveCharacteristic = async (id: number) => {
    await removeCharacteristic({ variables: { id } });
  };

  return (
    <div className="sm:px-5 md:px-0 md:p-5">
        <h2 className="text-xl font-bold">Here&apos;s what your AI knows...</h2>
        <p>
            Your chatbot is equipped with the following information to assist you in
            your conversation with your customers & users
        </p>
        <ul className="flex flex-wrap-reverse gap-7 mt-4">
            {characteristics?.map((characteristic: ChatbotCharacteristics) => (
            <li
                key={characteristic.id}
                className="relative border border-gray-300 rounded-lg p-4 bg-white shadow-md flex items-center justify-between"
            >
                <p className="flex-1 mr-4">{characteristic.content}</p>
                <OctagonX
                className="w-5 h-5 min-w-[20px] text-red-600 cursor-pointer hover:opacity-50"
                onClick={() => {
                    const promise = handleRemoveCharacteristic(characteristic.id);
                    toast.promise(promise, {
                    loading: "Removing characteristic...",
                    success: "Characteristic removed",
                    error: "Error removing characteristic",
                    });
                }}
                />
            </li>
            ))}
        </ul>
    </div>
  );
};
export default Characteristics;
