import {
  defineSchema,
  defineTable,
} from "convex/server";
import { v } from "convex/values";

// Define the schema for the Convex database
export default defineSchema({
  // Define the "documents" table
  documents: defineTable({
    // Title of the document (required)
    title: v.string(),

    // Initial content of the document (optional)
    initialContent: v.optional(
      v.string(),
    ),

    // ID of the user who owns the document (required)
    ownerId: v.string(),

    // ID of the room where the document is shared (optional)
    roomId: v.optional(v.string()),

    // ID of the organization the document belongs to (optional)
    organizationId: v.optional(
      v.string(),
    ),
  })
    // Index for efficient lookups by ownerId
    .index("by_owner_id", ["ownerId"])

    // Index for efficient lookups by organizationId
    .index("by_organization_id", [
      "organizationId",
    ])

    // Full-text search index on the title field, with optional filtering by ownerId and organizationId
    .searchIndex("search_title", {
      searchField: "title", // Enables searching documents by title
      filterFields: [
        "ownerId",
        "organizationId",
      ], // Allows filtering results by owner or organization
    }),
});
