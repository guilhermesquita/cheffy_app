import { CheffyAppError, httpResponse } from "../error/CheffyAppError";

export class CheffyUnauthorized extends CheffyAppError {
  constructor(response: httpResponse) { 
    super(response); 
    this.response.code = 401
  }
}

export class CheffyBadRequest extends CheffyAppError {
  constructor(response: httpResponse) { 
    super(response); 
    this.response.code = 400
  }
}

export class CheffyNotFoundError extends CheffyAppError {
  constructor(response: httpResponse) { 
    super(response); 
    this.response.code = 404
  }
}

export class CheffyNotForbiddenError extends CheffyAppError {
  constructor(response: httpResponse) { 
    super(response); 
    this.response.code = 403
  }
}

export class CheffyConflictError extends CheffyAppError {
  constructor(response: httpResponse) { 
    super(response); 
    this.response.code = 409
  }
}
