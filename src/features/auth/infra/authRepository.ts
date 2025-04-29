import { prisma } from "@/features/instace/prisma";
import {
  registerInputDTO,
  registerOutputDTO,
} from "../domain/repository/params/register.dto";
import { IRegister } from "../domain/repository/register";
import { ICheckProfileByEmail } from "../domain/repository/checkProfileByEmail";
import { JwtService } from "@/features/config/jwt";
import { PasswordHasher } from "@/features/config/bcrypt";

export class AuthRepository implements IRegister, ICheckProfileByEmail {
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
}
