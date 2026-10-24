"use client";
import { useState } from "react";

export default function Sidebar({ onSelect }: any) {
  const users = [
    { name: "Aman", unread: 2 },
    { name: "Riya", unread: 1 },
    { name: "Rahul", unread: 0 },
  ];
  const [active, setActive] = useState("");

  return (
    <div className="w-64 bg-gray-900 text-white h-screen p-5">
      <h2 className="text-xl font-bold mb-6">Chats</h2>

      <div className="space-y-3">
        {users.map((user) => (
          <div
            key={user.name}
            onClick={() => {
              setActive(user.name);
              onSelect(user.name);
            }}
            className={`p-2 rounded cursor-pointer flex justify-between items-center ${
              active === user.name ? "bg-blue-600" : "bg-gray-700"
            }`}
          >
            <span>{user.name}</span>

            {user.unread > 0 && (
              <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                {user.unread}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
