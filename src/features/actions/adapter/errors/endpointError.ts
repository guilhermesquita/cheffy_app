export class EndpointError extends Error{}

export class EndpointInternalServerError extends EndpointError{}
export class EndpointBadRequestError extends EndpointError{}
export class EndpointForbiddenError extends EndpointError{}
export class EndpointUnauthorizedError extends EndpointError{}