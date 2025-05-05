"use client";

import Avatar from "@/components/Avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@apollo/client";
import { CREATE_CHATBOT } from "graphql/mutations";
import { useUser } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const CreateChatbot = () => {
  const { user } = useUser();
  const [name, setName] = useState("");
  const router = useRouter()
  const [createChatbot] = useMutation(
    CREATE_CHATBOT,
    {
      variables: {
        clerk_user_id: user?.id,
        name,
      },
    }
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await createChatbot();
      setName('');
      router.push(`edit-chatbot/${data.insertChatbots.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  if(!user) return null;

  return (
    <div className="flex flex-col justify-center items-center bg-white p-10 rounded-md m-10 md:flex-row md:space-x-10">
      <Avatar seed="Create Avatar" />
      <div className="">
        <h1 className="text-xl lg:text-3xl font-semibold">Create</h1>
        <h3 className="font-light">
          Create you new chatbot to assist you in your conversations with your
          customers.
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 md:flex-row mt-5" action="">
          <Input
            className=""
            type="text"
            placeholder="Chatbot Name..."
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <Button>Create Chatbot</Button>
        </form>
      </div>
    </div>
  );
};
export default CreateChatbot;
