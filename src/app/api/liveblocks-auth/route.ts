import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import {
  auth,
  currentUser,
} from "@clerk/nextjs/server";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
);

const liveblocks = new Liveblocks({
  secret:
    process.env.LIVEBLOCKS_SECRET_KEY!,
});

export async function POST(
  req: Request,
) {
  // Get the current user's session claims
  const { sessionClaims } =
    await auth();

  // Check if the user is authenticated
  if (!sessionClaims) {
    return new Response(
      "Unauthorized",
      { status: 401 },
    );
  }
  // Get the current user
  const user = await currentUser();

  // Check if the user is authenticated
  if (!user) {
    return new Response(
      "Unauthorized",
      { status: 401 },
    );
  }
    // Getting the room from request body
  const { room } = await req.json();
  const document = await convex.query(
    api.documents.getById,
    { id: room },
  );

  // Check if the document exists
  if (!document) {
    return new Response(
      "Document not found",
      { status: 404 },
    );
  }

  const isOwner =
    document.ownerId === user.id;
  const isOrganizationMember =
    document.organizationId &&
    document.organizationId ===
      sessionClaims.org_id;

  if (
    !isOwner &&
    !isOrganizationMember
  ) {
    return new Response(
      "Unauthorized",
      { status: 403 },
    );
  }

  const session =
    liveblocks.prepareSession(user.id, {
      userInfo: {
        name:
          user.fullName ?? user.primaryEmailAddress?.emailAddress ?? "Anonymous",
        avatar: user.imageUrl,
      },
    });

  session.allow(
    room,
    session.FULL_ACCESS,
  );
  const { body, status } =
    await session.authorize();
  return new Response(body, { status });
}
