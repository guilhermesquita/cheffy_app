"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuthStore } from "@/app/[store]/auth-store";

export const AuthSyncClient = () => {
  const { data: session, status } = useSession();
  const { loginProfile, profile } = useAuthStore();

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user &&
      !profile
    ) {
      loginProfile({
        profile: {
          id: session.user.id as string,
          email: session.user.email as string,
          name: session.user.name ?? session.user.email as string,
        },
        token: session.accessToken as string,
      });
    }
  }, [status, session, profile, loginProfile]);

  return null;
};
