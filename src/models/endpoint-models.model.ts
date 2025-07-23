import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { IncomingHttpHeaders } from 'node:http';
import { ErrorResponseModel } from './error-response.model';

export type MiddlewareFunc = (
  req: Request,
  res: Response<any>
) => Observable<null>;

export type RequestFunction = (
  paramsObj: RequestFunctionParams,
  errorObj: ErrorResponseModel[]
) => Observable<any>;

export type RequestFunctionParams = Record<
  string,
  string | boolean | number | null | undefined
> & {
  headers: IncomingHttpHeaders;
};
