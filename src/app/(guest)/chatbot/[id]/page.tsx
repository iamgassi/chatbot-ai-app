"use client";
import React, { use } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import startNewChat from "@/lib/startNewChat";
import { useQuery } from "@apollo/client";
import { GetChatbotByIdResponse, GetChatbotByIdVariables, GetMessagesBySessionIdResponse, GetMessagesBySessionIdVariables, Message } from "types/types";
import { GET_CHATBOT_BY_ID, GET_MESSAGES_BY_CHAT_SESSION_ID } from "graphql/queries";
import Avatar from "@/components/Avatar";
import Messages from "@/components/Messages";

const Chatbot = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [open, setOpen] = React.useState(true);
  const [formData, setFormData] = React.useState({ username : '', email : '' });
  const [loading, setLoading] = React.useState(false);
  const [chatId, setChatId] = React.useState('');
  const [messages, setMessages] = React.useState<Message[]>([]);

  const { data: chatbotData } = useQuery<GetChatbotByIdResponse, GetChatbotByIdVariables>(
     GET_CHATBOT_BY_ID,
     {
       variables: { id },
     }
  );

  const { loading: loadingQuery, error, data } = useQuery<GetMessagesBySessionIdResponse, GetMessagesBySessionIdVariables>(
     GET_MESSAGES_BY_CHAT_SESSION_ID, { 
      variables: { chat_session_id : chatId },
      skip: !chatId
    }
  );

  React.useEffect(()=>{
    if(data){
      setMessages(data.chat_sessions.messages)
    }
  },[data])

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true);
    try {
      const chatId = await startNewChat(formData.username, formData.email, Number(id))
      setLoading(false);
      setChatId(chatId);
      setOpen(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full bg-gray-100">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle>Lets help you out!</DialogTitle>
              <DialogDescription>
                I just need a few details to get started.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="col-span-1 text-right" htmlFor="username">Username</Label>
                  <Input className="col-span-3" placeholder="Your username" name="username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="email">Email</Label>
                  <Input className="col-span-3" placeholder="Your email" name="email" value={formData.email} onChange={handleChange} />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={!formData.username || !formData.email || loading}>
                {loading ? 'Loading...' : 'Continue'}
              </Button>
            </DialogFooter>

          </form>
        </DialogContent>
      </Dialog>

      <div className="flex flex-col w-full max-w-3xl mx-auto bg-white md:rounded-t-lg shadow-2xl md:mt-10">
        {chatbotData && (
          <>
            <div className="pb-4 border-b sticky top-0 z-50 bg-[#4d7bfb] py-5 px-10 text-white md:rounded-t-lg flex items-center space-x-5">
              <Avatar seed={chatbotData?.chatbots.name} className="bg-white w-12 h-12 rounded-full"/>
              <div>
                <h1 className="trucate text-lg">{chatbotData?.chatbots.name}</h1>
                <p>⚡Typically replies instantly</p>
              </div>
            </div>
            <Messages chatbotName={chatbotData?.chatbots.name!} messages={messages}></Messages>
          </>
        )
        }
      </div>
    </div>
  );
};

export default Chatbot;
