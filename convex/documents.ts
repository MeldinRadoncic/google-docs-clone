import { query } from "./_generated/server";

// Get all documents API endpoint
export const get = query({
  handler: async (ctx) => {
    return await ctx.db
      .query("documents")
      .collect();
  },
});
