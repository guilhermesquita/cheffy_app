import { Profile } from "@prisma/client"

type PublicProfile = Pick<Profile, 'id' | 'name' | 'email'>;

export interface registerInputDTO {
    name: string
    email: string
    password: string
}

export interface registerOutputDTO{
    token: string
    profile: PublicProfile;
}