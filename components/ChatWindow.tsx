"use client";

import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

export default function ChatWindow({ user }: any) {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // 🟢 load messages from Convex
  const messages =
    useQuery(api.messages.getMessages, {
      user1: "me",
      user2: user,
    }) || [];

  // 🟢 send message to DB
  const sendMessageToDB = useMutation(api.messages.sendMessage);

  const [onlineUsers] = useState(["Aman", "Riya"]);

  // 🟢 auto scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const time = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    sendMessageToDB({
      text: input,
      sender: "me",
      receiver: user,
      time,
    });

    setInput("");
    setIsTyping(false);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* HEADER */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
          {user?.[0]}
        </div>

        <div>
          <div className="font-bold flex items-center gap-2">
            {user}
            {onlineUsers.includes(user) && (
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            )}
          </div>

          <div className="text-xs text-gray-400">
            {onlineUsers.includes(user) ? "online" : "offline"}
          </div>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-6 space-y-3 overflow-y-auto">
        {messages.map((msg: any) => (
          <div
            key={msg._id}
            className={`px-4 py-2 rounded-2xl shadow-md w-fit max-w-xs animate-fadeIn ${
              msg.sender === "me"
                ? "bg-blue-600 text-white ml-auto"
                : "bg-gray-700 text-white"
            }`}
          >
            <div>{msg.text}</div>

            <div className="text-xs opacity-70 mt-1 text-right">
              {msg.time}
            </div>
          </div>
        ))}

        {/* typing indicator */}
        {isTyping && (
          <div className="text-sm text-gray-400 italic">
            typing...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setIsTyping(e.target.value.length > 0);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type a message..."
          className="flex-1 p-2 rounded bg-gray-800 text-white outline-none"
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}