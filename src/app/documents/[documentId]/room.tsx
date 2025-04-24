"use client";

import { useState, useEffect } from "react";
import { ReactNode } from "react";
import { FullScreenLoader } from "@/components/full-screen-loader";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { getUser } from "./actions";
import { toast } from "sonner";


type User = {
  name: string;
  avatar: string;
}

export function Room({
  children,
}: {
  children: ReactNode;
}) {
  const [users, setUsers ] = useState<User[]>([]);
  const params = useParams();

  const fetchUser = async () => {
    try{
      const list = await getUser();
      setUsers(list);

    }catch(e){
      toast.error("Failed to fetch user");
      console.error(e);
    }

  }


  useEffect(() => {
    fetchUser();
  }, []);




  return (
    <LiveblocksProvider
      throttle={16}
      authEndpoint='/api/liveblocks-auth'>
      resolveUsers={({ userIds }) => {
  return userIds.map((userId) => users.find((user) => user.id === userId)) ?? undefined;
}}

resolveMentionSuggestions={({text}) => {
  let filteredUsers = users;

  if(text) {
    filteredUsers = users.filter((user) => user.name.toLowerCase().includes(text.toLowerCase()))
  }

}}


   


        resolveRoomsInfo = {() => []}
      <RoomProvider
        id={
          params.documentId as string
        }>
        <ClientSideSuspense
          fallback={
            <FullScreenLoader label='Room Loading...' />
          }>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
