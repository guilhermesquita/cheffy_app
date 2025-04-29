import { registerInputDTO, registerOutputDTO } from "./params/register.dto";

export interface IRegister {
    register: (params: registerInputDTO) => Promise<registerOutputDTO>
}