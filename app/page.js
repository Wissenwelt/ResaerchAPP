import ChatInputBox from "./_components/ChatInputBox";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="w-full">
      <div className="fixed top-4 right-4 z-50">
        <UserButton afterSignOutUrl="/" />
      </div>

      <ChatInputBox />
    </div>
  );
}
