"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import React, { useEffect } from "react";
import { BASE_URL } from "graphql/apolloClient";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";
import Avatar from "@/components/Avatar";
import { useMutation, useQuery } from "@apollo/client";
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from "types/types";
import { redirect, useParams } from "next/navigation";
import { GET_CHATBOT_BY_ID } from "graphql/queries";
import Characteristics from "@/components/Characteristics";
import { ADD_CHARACTERISTIC, REMOVE_CHATBOT, UPDATE_CHATBOT_NAME } from "graphql/mutations";
import { useRouter } from "next/navigation";
import { WarningDialog } from "@/components/WarningDialog";
import Loader from "@/components/Loader";

const EditChatBot = () => {
  // here use react.use() to extract id from params it show error
  const Router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [url, setUrl] = React.useState<string>("");
  const [copied, setCopied] = React.useState(false);
  const [chatbotName, setChatbotName] = React.useState<string>("");
  const [chatbotCharacteristics, setChatbotCharacteristics] =
    React.useState<string>("");
  const [onChatbotDeleteClick, setOnChatbotDeleteClick] =
    React.useState<boolean>(false);
  const { data } = useQuery<GetChatbotByIdResponse, GetChatbotByIdVariables>(
    GET_CHATBOT_BY_ID,
    {
      variables: { id },
    }
  );

  const [createCharacteristic] = useMutation(ADD_CHARACTERISTIC, {
    refetchQueries: ["GetChatbotById"],
  });
  const [deleteChatbot] = useMutation(REMOVE_CHATBOT);
  const [updateChatbotName] = useMutation(UPDATE_CHATBOT_NAME);

  useEffect(() => {
    const url = `${BASE_URL}/chatbot/${id}`;
    setUrl(url);
  }, [id]);

  useEffect(() => {
    if (data?.chatbots) {
      setChatbotName(data.chatbots.name);
    }
  }, [data]);

  const handleDeleteChatbot = async (id: string) => {
    const promise = deleteChatbot({ variables: { id } });
    toast.promise(promise, {
      loading: "Deleting chatbot...",
      success: "Chatbot deleted",
      error: "Error deleting chatbot",
    });
    Router.push("/view-chatbots");
  };

  const handleUpdateChatbotName = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const promise = updateChatbotName({
      variables: { id, name: chatbotName },
    });
    toast.promise(promise, {
      loading: "Updating chatbot Name...",
      success: "Chatbot Name updated",
      error: "Error updating chatbot Name",
    });
  };

  const handleChatbotCharacteristics = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const promise = createCharacteristic({
      variables: { content: chatbotCharacteristics, chatbot_id: id },
    });
    toast.promise(promise, {
      loading: "Adding characteristic...",
      success: "Characteristic added",
      error: "Error adding characteristic",
    });
    setChatbotCharacteristics("");
  };

  if (!data) {
    return <Loader type={1} />;
  }

  if (!data.chatbots) {
    return redirect("/view-chatbots");
  }

  return (
    <div className="sm:px-5 md:px-0 md:p-10">
      <div className="md:sticky md:top-0 z-50 sm:max-w-sm ml-auto space-y-2 md:border p-5 rounded-lg bg-blue-500">
        <h1 className="text-sm font-bold text-white">Link to chatbot</h1>
        <p className="text-sm italic text-white">
          Share this link with your customer to start a conversation with the chatbot
        </p>
        <div className="flex items-center space-x-2">
          <Link href={url} className="cursor-pointer w-full hover:opacity-50">
            <Input readOnly value={url} className="cursor-pointer text-white" />
          </Link>
          <Button
            variant="outline"
            className="bg-black text-white hover:bg-white hover:text-black transition-all duration-300 ease-in-out"
            onClick={() => {
              navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
              toast.success("Link copied to clipboard");
            }}
          >
            <span className="sr-only">Copy</span>
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
      <section className="w-full relative mt-5 p-5 bg-white rounded-lg md:p-10">
        <Button
          onClick={() => setOnChatbotDeleteClick(true)}
          className="absolute right-2 top-2 w-2 h-8"
          variant="destructive"
        >
          X
        </Button>
        <div className="flex space-x-4 mb-4">
          <Avatar seed={chatbotName} />
          <form
            className="flex flex-1 space-x-2 items-center"
            onSubmit={handleUpdateChatbotName}
          >
            <Input
              value={chatbotName}
              onChange={(e) => setChatbotName(e.target.value)}
              placeholder="Chatbot name"
              className="w-full border-none bg-transparent text-xl font-bold"
              required
            />
            <Button type="submit" disabled={!chatbotName}>
              Update
            </Button>
          </form>
        </div>
        {/* <h2 className="text-xl font-bold">Heres whats your AI knows...</h2>
        <p>Your chatbot is equipped with the following Information to assist you in your conversation with your customers & users</p> */}
        <div>
          <form
            onSubmit={handleChatbotCharacteristics}
            className="flex space-x-2 items-center"
          >
            <Input
              value={chatbotCharacteristics}
              onChange={(e) => setChatbotCharacteristics(e.target.value)}
              placeholder="Example: If user ask about your company, provide company page link: www.example.com"
              className="w-full border-none bg-transparent text-xl font-bold"
            />
            <Button type="submit" disabled={!chatbotCharacteristics}>
              Add
            </Button>
          </form>
          {data && (
            <Characteristics
              characteristics={data?.chatbots.chatbot_characteristics || []}
            />
          )}
        </div>
      </section>
      <WarningDialog
        subject="Chatbot"
        action={() => handleDeleteChatbot(id)}
        open={onChatbotDeleteClick}
        setOpen={setOnChatbotDeleteClick}
      />
    </div>
  );
};
export default EditChatBot;
