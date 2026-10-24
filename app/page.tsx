"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useEffect, useState } from "react";

import ChatWindow from "@/components/ChatWindow";
import UserList from "@/components/UserList";

export default function Home() {
  const { user } = useUser();

  const createUser = useMutation(api.users.createUser);

  const [selectedUser, setSelectedUser] = useState<any>(null);

  // ✅ Save logged-in user in Convex DB
  useEffect(() => {
    if (user) {
      createUser({
        name: user.fullName || "User",
        email: user.primaryEmailAddress?.emailAddress || "",
        image: user.imageUrl,
      });
    }
  }, [user]);

  return (
    <div className="h-screen">
      
      {/* NOT LOGGED IN */}
      <SignedOut>
        <div className="flex items-center justify-center h-screen">
          <SignInButton />
        </div>
      </SignedOut>

      {/* LOGGED IN */}
      <SignedIn>

        {/* Top bar */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h1 className="font-semibold text-lg">Chat App</h1>
          <UserButton />
        </div>

        {/* Main layout */}
        <div className="flex h-[calc(100vh-64px)]">

          {/* Users Sidebar */}
          <UserList onSelect={setSelectedUser} />

          {/* Chat Area */}
          {selectedUser ? (
            <ChatWindow user={selectedUser.name} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a user to start chatting
            </div>
          )}

        </div>

      </SignedIn>
    </div>
  );
}