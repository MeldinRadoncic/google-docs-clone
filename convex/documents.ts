import { ConvexError } from "convex/values";
import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

// Get all documents API endpoint
export const get = query({
  args: { paginationOpts : paginationOptsValidator },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .paginate(args.paginationOpts);
  },
});

// Create a document API endpoint
export const create = mutation({
  args: { title: v.optional(v.string()), initialContent: v.optional(v.string())},
  handler: async ( ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
  if(!user) {
    throw new ConvexError("Unauthenticated");
  }

  return await ctx.db.insert("documents", {
    title: args.title ?? "Untitled Document",
    ownerId: user.subject,
    initialContent: args.initialContent,
  });
  } 

  
 
});

