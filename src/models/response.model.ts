import { ErrorCode } from './error.model';
import { ErrorResponseModel } from './error.response.model';

export class ResponseModel {
  status?: ErrorCode;
  data: Record<string, any>;
  errorObj?: ErrorResponseModel[];
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
    errorObj?: ErrorResponseModel[];
  }) {
    this.status = status;
    this.data = data;
    this.success = success;
    this.errorObj = errorObj || [];
  }
}
