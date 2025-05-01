export interface httpResponse {
  code?: number;
  message: string;
}

export class CheffyAppError extends Error {
  response: httpResponse;
  constructor(response: httpResponse) {
    super();
    this.response = response;
  }
}
