import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const sendMessage = mutation({
  args: {
    text: v.string(),
    sender: v.string(),
    receiver: v.string(),
    time: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("messages", args);
  },
});

export const getMessages = query({
  args: {
    user1: v.string(),
    user2: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .filter((q) =>
        q.or(
          q.and(
            q.eq(q.field("sender"), args.user1),
            q.eq(q.field("receiver"), args.user2)
          ),
          q.and(
            q.eq(q.field("sender"), args.user2),
            q.eq(q.field("receiver"), args.user1)
          )
        )
      )
      .collect();
  },
});