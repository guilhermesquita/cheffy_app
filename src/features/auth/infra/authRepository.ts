import { prisma } from "@/features/instace/prisma";
import {
  registerInputDTO,
  registerOutputDTO,
} from "../domain/repository/params/register.dto";
import { IRegister } from "../domain/repository/register";
import { ICheckProfileByEmail } from "../domain/repository/checkProfileByEmail";
import { JwtService } from "@/features/config/jwt";
import { PasswordHasher } from "@/features/config/bcrypt";
import { IAuth } from "../domain/repository/auth";
import {
  loginInputDTO,
  loginOutputDTO,
} from "../domain/repository/params/login.dto";
import { ICheckCredentials } from "../domain/repository/checkCredentials";
import { Profile } from "@prisma/client";

export class AuthRepository
  implements IRegister, ICheckProfileByEmail, IAuth, ICheckCredentials
{
  async register(params: registerInputDTO): Promise<registerOutputDTO> {
    const hashedPassword = await new PasswordHasher().hashPassword({
      password: params.password,
    });

    const profileCreated = await prisma.profile.create({
      data: {
        ...params,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });

    const token = new JwtService().generateToken({ id: profileCreated.id });

    return {
      token: token,
      profile: profileCreated,
    };
  }

  async check(email: string): Promise<boolean> {
    const profileExists = await prisma.profile.findUnique({
      where: {
        email,
      },
    });

    if (profileExists) {
      return true;
    }

    return false;
  }

  async checkCredential({ email, password }: loginInputDTO): Promise<boolean> {
    const checkProfile = await prisma.profile.findUnique({
      where: {
        email,
      },
    });

    if (!checkProfile) {
      return false;
    }

    if (
      !(await new PasswordHasher().validatePassword({
        password,
        passwordHashed: checkProfile.password,
      }))
    ) {
      return false;
    }

    return true;
  }

  async auth({ email }: loginInputDTO): Promise<loginOutputDTO> {
    const profileLogged = await prisma.profile.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        name: true
      }
    }) as Profile

    const token = new JwtService().generateToken({ id: profileLogged.id });

    return {
      token: token,
      profile: profileLogged,
    };
  }
}
