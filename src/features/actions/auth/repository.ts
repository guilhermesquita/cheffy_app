import { loginInputDTO } from "@/features/auth/domain/repository/params/login.dto";
import { registerInputDTO } from "../../auth/domain/repository/params/register.dto";
import { endpointAdapter } from "../../instace/endpoint-adapter";
import {
  EndpointError,
  EndpointUnauthorizedError,
} from "../adapter/errors/endpointError";
import { AuthError } from "./errors/AuthError";
import { AuthErrorUnauthorized } from "./errors/AuthErrorUnauthorized";
import { responseType } from "./responseType";

export const authRepository = {
  register(params: registerInputDTO) {
    const request = endpointAdapter.post({
      path: "auth/request",
      body: {
        params,
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
