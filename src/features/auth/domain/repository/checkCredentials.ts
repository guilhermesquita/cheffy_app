import { loginInputDTO } from "./params/login.dto";

export interface ICheckCredentials{
    checkCredential: (params: loginInputDTO) => Promise<boolean>
}