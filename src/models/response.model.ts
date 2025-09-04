import { ErrorCode, ErrorResponseModel } from './error-response.model';

export class ResponseModel {
  status?: ErrorCode;
  data: Record<string, any>;
  success: boolean;
  errorObj?: ErrorResponseModel | null;
  constructor({
    status,
    data,
    success,
    errorObj,
  }: {
    status?: ErrorCode;
    data?: Record<string, any>;
    success?: boolean;
    errorObj: ErrorResponseModel | null;
  }) {
    this.status = status;
    this.data = data;
    this.success = success;
    this.errorObj = errorObj ?? null;
  }
}
