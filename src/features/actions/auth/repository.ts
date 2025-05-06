import { loginInputDTO } from "@/features/auth/domain/repository/params/login.dto";
import { registerInputDTO } from "../../auth/domain/repository/params/register.dto";
import { endpointAdapter } from "../../instace/endpoint-adapter";
import {
  EndpointConflictError,
  EndpointError,
  EndpointUnauthorizedError,
} from "../adapter/errors/endpointError";
import { AuthError } from "./errors/AuthError";
import { AuthErrorUnauthorized } from "./errors/AuthErrorUnauthorized";
import { responseType } from "./responseType";
import { AuthConflictError } from "./errors/AuthConflictError";

export const authRepository = {
  async register({email, password, name}: registerInputDTO) {
    const request = await endpointAdapter.post<responseType>({
      path: "api/auth/register",
      body: {
        email,
        password,
        name
      },
    });
    
    if (request instanceof EndpointConflictError) {
      throw new AuthConflictError();
    }

    if (request instanceof EndpointError) {
      throw new AuthError();
    }

    return request;
  },
  async login({ password, email }: loginInputDTO) {
    const request = await endpointAdapter.post<responseType>({
      path: "api/auth/",
      body: {
        password,
        email,
      },
    });
    
    if (request instanceof EndpointUnauthorizedError) {
      throw new AuthErrorUnauthorized();
    }

    if (request instanceof EndpointError) {
      throw new AuthError();
    }

    return request;
  },
};
