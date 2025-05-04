/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { RawAxiosRequestHeaders } from "axios";

export class EndpointParams {
  baseUrl?: string;
  path!: string;
  method!: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  headers?: RawAxiosRequestHeaders;
  params?: Record<string, any>;
  body?: Object;
  needToken?: boolean;
  retryRefreshToken?: boolean;
  checkCredential?: boolean
}

export type GetParams = Omit<EndpointParams, "body" | "method">;
export type DeleteParams = Omit<EndpointParams, "body" | "method">;
export type PostParams = Omit<EndpointParams, "method">;
export type PutParams = Omit<EndpointParams, "method">;
export type PatchParams = Omit<EndpointParams, "method">;