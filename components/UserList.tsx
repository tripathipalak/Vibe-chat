"use client";

import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

export default function UserList({ onSelect }: any) {
  const users = useQuery(api.users.getUsers);

  if (!users) return <div className="p-4">Loading users...</div>;

  return (
    <div className="w-64 border-r border-gray-800">
      <h2 className="p-4 font-semibold">Users</h2>

      {users.map((u: any) => (
        <div
          key={u._id}
          onClick={() => onSelect(u)}
          className="p-3 cursor-pointer hover:bg-gray-800 flex items-center gap-3"
        >
          <img
            src={u.image}
            className="w-8 h-8 rounded-full"
          />
          <span>{u.name}</span>
        </div>
      ))}
    </div>
  );
}