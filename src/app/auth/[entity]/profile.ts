import { Profile } from "@prisma/client";

export type ProfileEntity = Omit<Profile, 'password' | 'createdAt' | 'updatedAt'> | null