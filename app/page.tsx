import { Inter } from "next/font/google";
import { ChatUI } from "./chat-ui/chat-ui";
import { ChatbotWidget } from "./chat-ui/widget";
import Link from 'next/link';


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
    <header className="sticky top-0 bg-red-500 py-4 ">
      <div className="flex justify-center container mx-auto px-4">
        <Link href="/">
          <div className="text-white text-xl font-bold">Mock CC Website</div>
        </Link>
      </div>
    </header>
    <div
      className={`min-h-screen bg-slate-100 flex items-center place-content-center overflow-hidden ${inter.className}`}
    >
      {/* <ChatbotWidget /> */}
    </div>
    </>
  );
}
