import { Profile } from "@prisma/client";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { ProfileEntity } from "../auth/[entity]/profile";

type AuthStore = {
  token: string | null;
  profile: ProfileEntity;
  loginProfile: (params: paramsSet) => void;
  setLogin: () => void;
};

interface paramsSet {
  token: string;
  profile: Omit<Profile, "password" | "createdAt" | "updatedAt">;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: "",
      profile: null,
      loginProfile: ({ token, profile }: paramsSet) => {
        set((state) => ({ ...state, token, profile }));
      },
      setLogin: () => {
        set((state) => ({ ...state, profile: null, token: null }));
      },
    }),
    {
      name: "session-auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
