import { loginInputDTO, loginOutputDTO } from "./params/login.dto";

export interface IAuth {
    auth: (params: loginInputDTO) => Promise<loginOutputDTO>
}