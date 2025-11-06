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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";

const formSchema = z.object({
  message: z.string().min(2, {
    message: "Message must be at least 2 characters.",
  }),
})
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

  const { data } = useQuery<GetMessagesBySessionIdResponse, GetMessagesBySessionIdVariables>(
     GET_MESSAGES_BY_CHAT_SESSION_ID, { 
      variables: { chat_session_id : chatId },
      skip: !chatId
    }
  );  
  
  const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        message: "",
      },
  })

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
      const chatId = await startNewChat(formData.username, formData.email, Number(id)) || '';
      setLoading(false);
      setChatId(chatId);
      setOpen(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }  
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
      setLoading(true);
      const { message : userMessage } = values;
      form.reset();
      if(!formData.username || !formData.email){
        setLoading(false);
        setOpen(true);
        return;
      }

      if(!userMessage){
        setLoading(false);
        return;
      }

      const userMessageObj: Message = {
        id: Date.now(),
        sender: "user",
        content: userMessage,
        created_at: new Date().toISOString(),
        chat_session_id: chatId,
      }

      const loadingMessageObj: Message = {
        id: Date.now() + 1,
        sender: "ai",
        content: "Thinking...",
        created_at: new Date().toISOString(),
        chat_session_id: chatId,
      }

      setMessages((prevMessages) => [...prevMessages, userMessageObj, loadingMessageObj]);

      try {
        const response = await fetch("/api/send-message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: userMessage,
            chat_session_id: chatId,
            chatbot_id: Number(id),
            name : formData.username,
            email : formData.email
          }),
        });

        const result = await response.json();
        setMessages((prevMessages) => 
          prevMessages.map((msg) =>
            msg.id === loadingMessageObj.id ? { ...msg, content: result.content, id : result.id } : msg
          )
        )
      } catch (error) {
        console.log(error)
        setMessages((prevMessages) => 
          prevMessages.map((msg) =>
            msg.id === loadingMessageObj.id ? { ...msg, content: "Failed to get response from AI" } : msg
          )
        )
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
            <div className="pb-4 border-b sticky top-0 z-50 bg-blue-500 py-5 px-10 text-white md:rounded-t-lg flex items-center space-x-5">
              <Avatar seed={chatbotData?.chatbots.name} className="bg-white w-12 h-12 rounded-full"/>
              <div>
                <h1 className="trucate text-lg">{chatbotData?.chatbots.name}</h1>
                <p>⚡Typically replies instantly</p>
              </div>
            </div>
            <Messages chatbotName={chatbotData?.chatbots.name ?? ''} messages={messages}></Messages>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start sticky bottom-0 z-50 border-t space-x-4 drop-shadow-2xl p-4 bg-gray-100 rounded-md">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Type a message..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className="h-full" type="submit">Submit</Button>
              </form>
            </Form>
          </>
        )
        }
      </div>
    </div>
  );
};

export default Chatbot;
