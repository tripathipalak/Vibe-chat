import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.string(),
  }),

  messages: defineTable({
    text: v.string(),
    sender: v.string(),
    receiver: v.string(),
    time: v.string(),
  }),
});