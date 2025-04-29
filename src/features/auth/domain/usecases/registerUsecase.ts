import { ICheckProfileByEmail } from "../repository/checkProfileByEmail";
import { registerInputDTO, registerOutputDTO } from "../repository/params/register.dto";
import { IRegister } from "../repository/register";

export class RegisterUsecase implements IRegister{
    constructor(
        private registerProfile: IRegister,
        private checkProfileExits: ICheckProfileByEmail
    ){}
    async register(params: registerInputDTO): Promise<registerOutputDTO>{
        if(await this.checkProfileExits.check(params.email)){
            throw new Error('usuário ja existente')
        }
        return await this.registerProfile.register(params)
    }
}