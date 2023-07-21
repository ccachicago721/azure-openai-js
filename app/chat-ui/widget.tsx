'use client'
import { useState } from 'react';
import { ChatUI } from "./chat-ui";


export const ChatbotWidget = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen((prevState) => !prevState);
  };

  return (
    <div className="fixed bottom-5 right-5 bg-white rounded-lg shadow-lg p-3">
      {isChatbotOpen ? (
        <div>
          <p onClick={toggleChatbot} className='absolute text-white right-0 top-0 px-6 py-4'>x</p>
          <ChatUI /> 
        </div>
      ) : (
        <button
          onClick={toggleChatbot}
          className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      )}
    </div>
  );
};