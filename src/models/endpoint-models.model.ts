import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { IncomingHttpHeaders } from 'node:http';
import { ErrorResponseModel } from './error-response.model';
import { ResponseModel } from './response.model';

export type MiddlewareFunc = (
  req: Request,
  res: Response<any>
) => Observable<null>;

export type RequestFunction<
  RequestParamsType extends Record<string, any>,
  RequestLocalsType extends Record<string, any>,
> = (
  paramsObj: RequestFunctionParams<RequestParamsType>,
  errorList: ErrorResponseModel[],
  locals: RequestLocalsType
) => Observable<ResponseModel>;

export type RequestFunctionParams<
  RequestParamsType extends Record<string, any>,
> = RequestParamsType & {
  headers: IncomingHttpHeaders;
};
