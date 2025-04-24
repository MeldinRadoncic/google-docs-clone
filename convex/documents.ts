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
    search: v.optional(v.string()),
  },
  handler: async (
    ctx,
    { search, paginationOpts },
  ) => {
    // Get the user identity to protect the documents
    const user =
      await ctx.auth.getUserIdentity();

    // Check if the user is authenticated
    if (!user) {
      throw new ConvexError(
        "Unauthenticated",
      );
    }

    // Get the organization ID
    const organizationId =
      (user.organization_id ??
        undefined) as
        | string
        | undefined;

    // Check if the organization ID is present
    if (search && organizationId) {
      return await ctx.db
        .query("documents")
        .withSearchIndex(
          "search_title",
          (q) =>
            q
              .search("title", search)
              .eq(
                "organizationId",
                organizationId,
              ),
        )
        .paginate(paginationOpts);
    }

    if (organizationId) {
      return await ctx.db
        .query("documents")
        .withIndex(
          "by_organization_id",
          (q) =>
            q.eq(
              "organizationId",
              organizationId,
            ),
        )
        .paginate(paginationOpts);
    }

    // Check if the search query is present
    if (search) {
      return await ctx.db
        .query("documents")
        .withSearchIndex(
          "search_title",
          (q) =>
            q
              .search("title", search)
              .eq(
                "ownerId",
                user.subject,
              ),
        )
        .paginate(paginationOpts);
    }

    return await ctx.db
      .query("documents")
      .withIndex("by_owner_id", (q) =>
        q.eq("ownerId", user.subject),
      )
      .paginate(paginationOpts);
  },
});

// Get a document by ID API endpoint
export const getById = query({
  args: { id: v.id("documents") },
  handler: async (ctx, { id }) => {
    // Get the document info
    const document =
      await ctx.db.get(id);
    if (!document) {
      throw new ConvexError(
        "Document not found",
      );
    }
    return document;
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

    const organizationId =
      (user.organization_id ??
        undefined) as
        | string
        | undefined;

    return await ctx.db.insert(
      "documents",
      {
        title:
          args.title ??
          "Untitled Document",
        ownerId: user.subject,
        organizationId,
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

      if (!user) return;
      const organizationId = (user.organization_id ?? undefined) as string | undefined;


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

    const isOwner =
      document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId &&
      document.organizationId ===
        organizationId
    );

    // Check if the document owner is the same as the user
    if (
      !isOwner &&
      !isOrganizationMember
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

    const organizationId =
      (user.organization_id ??
        undefined) as
        | string
        | undefined;

    // Check if the document exists
    if (!document) {
      throw new ConvexError(
        "Document not found",
      );
    }

    const isOwner =
      document.ownerId === user.subject;
    const isOrganizationMember = !!(
      document.organizationId &&
      document.organizationId ===
        organizationId
    );

    // Check if the document owner is the same as the user
    if (
      !isOwner &&
      !isOrganizationMember
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
