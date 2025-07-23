export enum ErrorCode {
  Timeout = 408,
  BadRequest = 400,
  InternalServerError = 500,
}

export enum ErrorType {
  InternalServerError = 'InternalServer',
  TimeoutError = 'Timeout',
  BadRequest = 'BadRequest',
}
