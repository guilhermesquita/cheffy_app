import { Profile } from "@prisma/client";

export interface responseType{
    token: string;
    profile: Profile
}