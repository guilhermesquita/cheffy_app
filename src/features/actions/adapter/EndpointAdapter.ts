/* eslint-disable @typescript-eslint/no-unused-vars */
import { CheffyAppError } from "@/features/error/CheffyAppError";
import { EndpointResponse } from "./entity/EndpointResponse";
import {
  DeleteParams,
  EndpointParams,
  GetParams,
  PatchParams,
  PostParams,
  PutParams,
} from "./entity/EndpointRequestEntity";
import axios, { AxiosError, AxiosInstance } from "axios";
import {
  EndpointBadRequestError,
  EndpointError,
  EndpointForbiddenError,
  EndpointInternalServerError,
  EndpointUnauthorizedError,
} from "./errors/endpointError";

export interface methods {
  get<T>(params: GetParams): Promise<EndpointResponse<T> | EndpointError>;
  post<T>(params: PostParams): Promise<EndpointResponse<T> | EndpointError>;
  put<T>(params: PutParams): Promise<EndpointResponse<T> | EndpointError>;
  patch<T>(params: PatchParams): Promise<EndpointResponse<T> | EndpointError>;
  delete<T>(params: DeleteParams): Promise<EndpointResponse<T> | EndpointError>;
}

export class EndpointAdapter implements methods {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "http://localhost:3000",
    });
  }
  async get<T>({ path, headers, params, needToken }: GetParams) {
    return this.performRequest<T>({
      path,
      headers: headers,
      params,
      needToken,
      method: "GET",
    });
  }

  async post<T>({
    path,
    headers,
    params,
    body,
    needToken,
    checkCredential,
  }: PostParams) {
    return this.performRequest<T>({
      path,
      headers: headers,
      params,
      body,
      method: "POST",
      needToken,
      checkCredential,
    });
  }

  async put<T>({
    baseUrl,
    path,
    headers,
    params,
    body,
    needToken,
  }: PutParams): Promise<EndpointResponse<T> | EndpointError> {
    return this.performRequest<T>({
      baseUrl,
      path,
      headers,
      params,
      body,
      method: "PUT",
      needToken,
    });
  }

  async patch<T>({ path, headers, params, body, needToken }: PatchParams) {
    return this.performRequest<T>({
      path,
      headers,
      params,
      body,
      method: "PATCH",
      needToken,
    });
  }

  async delete<T>({ path, headers, params, needToken }: DeleteParams) {
    return this.performRequest<T>({
      path,
      headers,
      params,
      method: "DELETE",
      needToken,
    });
  }

  private async performRequest<T>({
    baseUrl,
    path,
    headers,
    params,
    body,
    method,
    needToken = true,
    retryRefreshToken = true,
    checkCredential,
  }: EndpointParams): Promise<EndpointResponse<T> | EndpointError> {
    try {
      const defaultHeaders: Record<string, string> = {};
      //   if (needToken) {
      //     const localCredential =
      //       localStorage.getItem("credential") ||
      //       sessionStorage.getItem("credential");
      //     if (localCredential) {
      //       const credential = CredentialEntity.fromJson(
      //         JSON.parse(localCredential)
      //       );
      //       defaultHeaders["Authorization"] = `Bearer ${credential.access_token}`;
      //     }
      //   }
      //   const currentOrganization = localStorage.getItem(
      //     "currentOrganization"
      //   ) as string

      //   const currentOrgId = JSON.parse(currentOrganization)

      //   if (currentOrganization) {
      //     defaultHeaders["x-organization-id"] = currentOrgId.orgId;
      //   }

      const axiosReponse = await this.instance.request<EndpointResponse<T>>({
        baseURL: baseUrl,
        url: path,
        method,
        headers: {
          ...defaultHeaders,
          ...headers,
        },
        params,
        data: body,
      });
      return {
        status: axiosReponse.status,
        data: axiosReponse.data.data,
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        const status = error.response?.status;
        if (status === 500) return new EndpointInternalServerError();
        if (status === 400) return new EndpointBadRequestError();
        if (status === 403) return new EndpointForbiddenError();
        if (status === 401 && !checkCredential) {
          if (retryRefreshToken) {
            try {
              // await this.refreshToken();
            } catch (e) {
              return new EndpointUnauthorizedError();
            }

            const result = await this.performRequest<T>({
              path,
              headers,
              params,
              body,
              method,
              needToken,
              retryRefreshToken: false,
            });

            if (result instanceof EndpointUnauthorizedError && needToken) {
              localStorage.clear();
              sessionStorage.clear();
              if (path !== "api/auth/") {
                window.location.href = "/auth/login";
              }
            }

            return result;
          }
          return new EndpointUnauthorizedError();
        }
        // return new EndpointResponseError();
      }
      throw error;
    }
  }
}
