import { ConvexError } from "convex/values";
import {
  query,
  mutation,
} from "./_generated/server";
import { v } from "convex/values";
import { paginationOptsValidator } from "convex/server";

// Get all documents API endpoint
export const get = query({
  args: {
    paginationOpts:
      paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("documents")
      .paginate(args.paginationOpts);
  },
});

// Create a document API endpoint
export const create = mutation({
  args: {
    title: v.optional(v.string()),
    initialContent: v.optional(
      v.string(),
    ),
  },
  handler: async (ctx, args) => {
    const user =
      await ctx.auth.getUserIdentity();
    if (!user) {
      throw new ConvexError(
        "Unauthenticated",
      );
    }

    return await ctx.db.insert(
      "documents",
      {
        title:
          args.title ??
          "Untitled Document",
        ownerId: user.subject,
        initialContent:
          args.initialContent,
      },
    );
  },
});

// Remove a document API endpoint
export const removeById = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const user =
      await ctx.auth.getUserIdentity(); // Get the user identity

    // Check if the user is authenticated
    if (!user) {
      throw new ConvexError(
        "Unauthenticated",
      );
    }
    // Get the document by ID
    const document = await ctx.db.get(
      args.id,
    );

    // Check if the document exists
    if (!document) {
      throw new ConvexError(
        "Document not found",
      );
    }
    // Check if the document owner is the same as the user
    if (
      document.ownerId !== user.subject
    ) {
      throw new ConvexError(
        "Unauthorized",
      );
    }
    await ctx.db.delete(args.id); // Delete the document
  },
});

// Update a document API endpoint
export const updateById = mutation({
  args: {
    id: v.id("documents"),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const user =
      await ctx.auth.getUserIdentity(); // Get the user identity

    // Check if the user is authenticated
    if (!user) {
      throw new ConvexError(
        "Unauthenticated",
      );
    }
    // Get the document by ID
    const document = await ctx.db.get(
      args.id,
    );

    // Check if the document exists
    if (!document) {
      throw new ConvexError(
        "Document not found",
      );
    }
    // Check if the document owner is the same as the user
    if (
      document.ownerId !== user.subject
    ) {
      throw new ConvexError(
        "Unauthorized",
      );
    }
    await ctx.db.patch(args.id, {
      title: args.title,
    }); // Update the document
  },
});
