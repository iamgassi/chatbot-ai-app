import Link from "next/link";
import Avatar from "./Avatar";
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Header = () => {
  return (
    <header className="flex justify-between bg-white items-center text-gray-800 shadow-sm p-5">
      <Link
        className="flex items-center text-4xl font-thin" 
        href={"/"}
      >
        <Avatar seed="AI" />
        <div className="p-2 space-y-1">
            <h1>Assistly</h1>
            <h2 className="text-sm">Your customizable AI Chat Agent</h2>
        </div>
      </Link>
      <div className="flex items-center">
        <SignedIn>
          <UserButton showName/>
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>
    </header>
  );
};
export default Header;
