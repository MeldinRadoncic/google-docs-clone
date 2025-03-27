"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";

export function Room({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_eVYgtxudt8YZJdbZvDaSYDiM01mDam0CujhijLgs6MnoeAN3EdQ6RR3EAAiBzR-Z"
      }>
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense
          fallback={
            <div>Loading…</div>
          }>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
