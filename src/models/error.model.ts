import { ErrorCode, errorMessages, ErrorResponseModel } from './error-response.model';

export class FacebookMissingParamError extends ErrorResponseModel {
  constructor(paramName: string) {
    super(ErrorCode.FacebookMissingParameters, `Missing parameter: ${paramName}`, errorMessages.FacebookMissingParameters);
  }
}
