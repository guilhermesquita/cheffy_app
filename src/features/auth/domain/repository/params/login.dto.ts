import { Profile } from "@prisma/client";

export interface loginInputDTO {
  email: string;
  password: string;
}

export interface loginOutputDTO {
  token: string;
  profile: Profile;
}
