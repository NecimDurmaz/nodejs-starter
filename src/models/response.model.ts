import { ErrorCode } from './error.model';
import { ErrorResponse } from './errorResponse';

export class ResponseModel {
  status?: ErrorCode;
  data: Record<string, any>;
  errorObj?: ErrorResponse[];
  success: boolean;
  constructor({
    status,
    data,
    success,
    errorObj,
  }: {
    status?: ErrorCode;
    data?: Record<string, any>;
    success?: boolean;
    errorObj?: ErrorResponse[];
  }) {
    this.status = status;
    this.data = data;
    this.success = success;
    this.errorObj = errorObj || [];
  }
}
