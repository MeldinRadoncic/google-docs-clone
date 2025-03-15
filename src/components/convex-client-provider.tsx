"use client";

import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import { ReactNode } from "react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  ClerkProvider,
  useAuth,
  SignIn,
} from "@clerk/clerk-react";
import { FullScreenLoader } from "./full-screen-loader";

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL!,
);
// ConvexClientProvider code from convex docs
export function ConvexClientProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ClerkProvider
      publishableKey={
        process.env
          .NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!
      }>
      <ConvexProviderWithClerk
        useAuth={useAuth}
        client={convex}>
        <Authenticated>
          {children}
        </Authenticated>
        <Unauthenticated>
          <div className='flex flex-col justify-center items-center h-screen'>
            <SignIn />
          </div>
        </Unauthenticated>
        <AuthLoading>
          <FullScreenLoader label='Auth Loading' />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
