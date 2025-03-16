"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { X } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "When can I pick it up?",
    time: "10:35 AM",
    avatar: "/default-avatar.png",
    messages: [
      {
        id: 1,
        sender: "John Doe",
        message: "Hey! Is this still available?",
        time: "10:30 AM",
      },
      { id: 2, sender: "You", message: "Yes, it is!", time: "10:32 AM" },
      {
        id: 3,
        sender: "John Doe",
        message: "Great! When can I pick it up?",
        time: "10:35 AM",
      },
    ],
  },
  {
    id: 2,
    name: "Alice Brown",
    lastMessage: "Thanks!",
    time: "Yesterday",
    avatar: "/default-avatar.png",
    messages: [
      {
        id: 1,
        sender: "Alice Brown",
        message: "Hey, I received it!",
        time: "Yesterday",
      },
      {
        id: 2,
        sender: "You",
        message: "Awesome, glad you liked it!",
        time: "Yesterday",
      },
      { id: 3, sender: "Alice Brown", message: "Thanks!", time: "Yesterday" },
    ],
  },
];

const MessagingPage = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0].id);
  const [messages, setMessages] = useState(conversations[0].messages);
  const [newMessage, setNewMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const chat = conversations.find((c) => c.id === selectedChat);
    setMessages(chat ? chat.messages : []);
  }, [selectedChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    const updatedMessages = [
      ...messages,
      {
        id: messages.length + 1,
        sender: "You",
        message: newMessage,
        time: "Now",
      },
    ];
    setMessages(updatedMessages);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/4 bg-gray-200 dark:bg-gray-800 p-6 border-r fixed md:relative h-full md:h-auto overflow-y-auto transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex justify-end items-center">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden "
          >
            <X />
          </button>
        </div>
        <h2 className="text-lg font-bold mb-4">Messages</h2>
        <div>
          {conversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setSelectedChat(chat.id)}
              className={`flex items-center mb-3 gap-2 p-3 cursor-pointer rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition ${
                selectedChat === chat.id ? "bg-gray-300 dark:bg-gray-700" : ""
              }`}
            >
              <Image
                src={chat.avatar}
                alt={chat.name}
                width={20}
                height={20}
                className="rounded-full border border-purple-300 w-12 h-12"
              />
              <div className="ml-3">
                <p className="font-semibold">{chat.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-full md:w-3/4 md:ml-1/4 flex flex-col h-screen">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 border-b shadow flex justify-between">
          <h2 className="text-lg font-bold">
            {conversations.find((c) => c.id === selectedChat)?.name}
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            ☰
          </button>
        </div>
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100 dark:bg-gray-900">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-4 ${
                msg.sender === "You" ? "text-right" : "text-left"
              }`}
            >
              <p
                className={`inline-block px-4 py-2 rounded-lg ${
                  msg.sender === "You"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
              >
                {msg.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {msg.time}
              </p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Message Input */}
        <div className="bg-white dark:bg-gray-800 p-6 flex items-center border-t">
          <input
            type="text"
            className="flex-1 p-2 border rounded-lg focus:outline-none bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            onClick={handleSendMessage}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
