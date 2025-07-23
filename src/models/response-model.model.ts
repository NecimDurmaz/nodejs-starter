import { ErrorCode } from './error.model';

export class ResponseModelModel {
  status: ErrorCode;
  body?: Record<string, any>;
  success: boolean;
  constructor({
    status,
    body,
    success,
  }: {
    status: ErrorCode;
    body?: Record<string, any>;
    success?: boolean;
  }) {
    this.status = status;
    this.body = body;
    this.success = success;
  }
}
