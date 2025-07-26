"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import startNewChat from "@/lib/startNewChat";
import { useQuery } from "@apollo/client";
import { GetChatbotByIdResponse, GetChatbotByIdVariables } from "types/types";
import { GET_CHATBOT_BY_ID } from "graphql/queries";
import Avatar from "@/components/Avatar";

const Chatbot = ({ params: { id } }: { params: { id: string } }) => {
  const [open, setOpen] = React.useState(true);
  const [formData, setFormData] = React.useState({ username : '', email : '' });
  const [loading, setLoading] = React.useState(false);
  const [chatId, setChatId] = React.useState(null);

  const { data: chatbotData } = useQuery<GetChatbotByIdResponse, GetChatbotByIdVariables>(
     GET_CHATBOT_BY_ID,
     {
       variables: { id },
     }
  );

  React.useEffect(()=>{

  },[chatbotData])

  const handleChange = (e: React.ChangeEvent<HTMLElement>) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    debugger
    e.preventDefault()
    setLoading(true);
    try {
      const chatId = await startNewChat(formData.username, formData.email, Number(id))
      setLoading(false);
      setChatId(chatId)
      setOpen(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  }

  return (
    <div className="flex w-full bg-gray-100">
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
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

      <div className="">
        <div>
          <Avatar seed={chatbotData?.chatbots.name} className="w-20 h-20"/>
          <div>
            <h1>{chatbotData?.chatbots.name}</h1>
            <p>Typically replies instantly</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
