import { Request, Response } from 'express';
import {
  from,
  mergeMap,
  of,
  Subject,
  switchMap,
  takeUntil,
  TimeoutError,
} from 'rxjs';
import { catchError, finalize, map, timeout } from 'rxjs/operators';
import {
  MiddlewareFunc,
  RequestFunction,
  RequestFunctionParams,
} from '../models/endpoint-models.model';
import { ResponseModel } from '../models/response.model';
import { ErrorResponse } from '../models/error.response';
import { randomUUID } from 'node:crypto';
import { ErrorCode, ErrorType } from '../models/error.model';
import moment from 'moment';
import { env } from '../../env';

export const requestHandler = <
  RequestParamsType extends Record<string, any>,
  RequestLocalsType extends Record<string, any>,
>(
  func: RequestFunction<RequestParamsType, RequestLocalsType>,
  middlewares: Array<MiddlewareFunc>
): ((req: Request, res: Response<any>) => void) => {
  return (req: Request, res: Response<any, RequestLocalsType>): void => {
    const canceller = new Subject<void>();
    res.on('close', () => {
      if (res.writable) {
        canceller.next();
      }
      canceller.complete();
    });

    const timeoutDuration = env('TIMEOUTDURATION');
    const errorObj: ErrorResponse[] = [];
    const uuid = randomUUID();
    const startTime = moment();

    console.log(
      `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${uuid}] Request: ${req.method} ${req.url};`
    );

    of(null)
      .pipe(
        map(() => {
          const params: RequestFunctionParams<RequestParamsType> = {
            ...req.query,
            ...req.params,
            ...req.body,
            headers: req.headers,
          };

          return params;
        }),
        switchMap(params => {
          if (middlewares.length === 0) {
            return of(params);
          } else {
            return from(middlewares)
              .pipe(
                mergeMap(middleware => {
                  return from(middleware(req, res));
                }, 1)
              )
              .pipe(
                map(() => {
                  return params;
                })
              );
          }
        }),
        switchMap((params: RequestFunctionParams<RequestParamsType>) => {
          return func(params, errorObj, res.locals);
        }),
        timeout(timeoutDuration),
        catchError(
          (e: ErrorResponse | ResponseModel | TimeoutError | Error | any) => {
            let responseObj: ResponseModel;
            if (e instanceof TimeoutError) {
              errorObj.push({
                status: ErrorCode.Timeout,
                name: ErrorType.TimeoutError,
                message:
                  'Request took too much time, please check parameters and try again.',
              });
              responseObj = {
                success: false,
                status: ErrorCode.Timeout,
                data: null,
                errorObj,
              };
            } else if (e instanceof ErrorResponse) {
              errorObj.push({
                status: e.status ?? ErrorCode.BadRequest,
                message: e.message,
                name: e.name ?? ErrorType.BadRequest,
              });

              responseObj = {
                status: e.status,
                data: null,
                errorObj,
                success: false,
              };
            } else if (e instanceof ResponseModel) {
              responseObj = {
                status: e.status,
                data: e.data,
                success: e.success,
              };
            } else {
              if (e instanceof Error) {
                errorObj.push({
                  name: e.name,
                  status: ErrorCode.InternalServerError,
                  message: e?.message ?? 'Unknown Error',
                });
                responseObj = {
                  success: false,
                  status: ErrorCode.InternalServerError,
                  errorObj,
                  data: null,
                };
              } else {
                errorObj.push({
                  name: ErrorType.InternalServerError,
                  status: ErrorCode.InternalServerError,
                  message: (e as any)?.message ?? 'Unknown Error',
                });
                responseObj = {
                  success: false,
                  status: ErrorCode.InternalServerError,
                  errorObj,
                  data: null,
                };
              }

              console.error(
                `${req.route.path}  Error: `,
                e,
                JSON.stringify({
                  url: req.url,
                  query: req.query,
                  param: req.params,
                })
              );
            }

            return of(responseObj);
          }
        ),
        map((response: ResponseModel) => {
          res
            .status(response.status ?? (response.success ? 200 : 400))
            .json(response);
          return null;
        }),
        takeUntil(canceller),
        finalize(() => {
          const timeDiff = moment().diff(moment(startTime), 'milliseconds');
          console.log(
            `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${uuid}] Response: ${res.statusCode} ${res.statusMessage}; Duration: ${timeDiff}ms`
          );
          if (res.writable) {
            res.sendStatus(500);
          }
        })
      )
      .subscribe();
  };
};
