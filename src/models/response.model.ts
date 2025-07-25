import { ErrorCode } from './error.model';
import { ErrorResponseModel } from './error-response.model';

export class ResponseModel {
  status?: ErrorCode;
  data: Record<string, any>;
  errorList?: ErrorResponseModel[];
  success: boolean;
  constructor({
    status,
    data,
    success,
    errorList,
  }: {
    status?: ErrorCode;
    data?: Record<string, any>;
    success?: boolean;
    errorList?: ErrorResponseModel[];
  }) {
    this.status = status;
    this.data = data;
    this.success = success;
    this.errorList = errorList || [];
  }
}
