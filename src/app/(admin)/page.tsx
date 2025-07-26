import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="p-10 bg-white mt-10 rounded-md w-full">
      <h1 className="text-4xl font-light">
        {" "}
        Welcome to <span className="text-[#72aff0] semibold">Assistly</span>
      </h1>
      <h2>
        {" "}
        Your customizable AI chat agents that helps you manage your
        conversations
      </h2>
      <Link
        href="/create-chatbot"
      >
        <Button className="bg-[#72aff0]">Let's get stated by creating your first chatbot</Button>
      </Link>
    </main>
  );
}
