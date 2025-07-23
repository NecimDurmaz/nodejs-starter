import { ErrorCode } from './error.model';

export class ErrorResponseModel extends Error {
  status: ErrorCode;
  message: string;

  constructor(status: ErrorCode, message: string) {
    super(message);
    this.status = status;
  }
}
