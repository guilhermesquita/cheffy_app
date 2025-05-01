import { CheffyUnauthorized } from "@/features/instace/http-response";
import { IAuth } from "../repository/auth";
import { ICheckCredentials } from "../repository/checkCredentials";
import { loginInputDTO, loginOutputDTO } from "../repository/params/login.dto";

export class AuthUsecase implements IAuth {
    constructor(private authRepository: IAuth, private checkCredentials: ICheckCredentials){}

    async auth(params: loginInputDTO): Promise<loginOutputDTO> {
        if(!await this.checkCredentials.checkCredential(params)){
            throw new CheffyUnauthorized({
                message: 'Email ou senha incorreta'
            })
        }
        return await this.authRepository.auth(params)
    }
}