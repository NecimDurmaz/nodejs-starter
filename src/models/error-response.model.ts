export enum ErrorCode {
  Timeout = 408,
  BadRequest = 400,
  InternalServerError = 500,

  FacebookMissingParameters = 1001,
}

export enum ErrorType {
  InternalServerError = 'InternalServer',
  TimeoutError = 'Timeout',
  BadRequest = 'BadRequest',
  FacebookMissingParameters = 'FacebookMissingParameters',
}

export const errorMessages :Record<ErrorType, string> = {
  [ErrorType.InternalServerError]: 'Internal server error',
  [ErrorType.TimeoutError]: 'Request timeout',
  [ErrorType.BadRequest]: 'Bad request',
  [ErrorType.FacebookMissingParameters]: 'Facebook missing parameters',
};

export class ErrorResponseModel extends Error {
  status: ErrorCode;
  message: string;
  techniqueMessage: string;

  constructor(status: ErrorCode, message: string,techniqueMessage: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.techniqueMessage = techniqueMessage;
  }
}
