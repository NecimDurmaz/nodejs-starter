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
import { ResponseModelModel } from '../models/response-model.model';
import { ErrorResponseModel } from '../models/error-response.model';
import { randomUUID } from 'node:crypto';
import { ErrorCode, ErrorType } from '../models/error.model';
import moment from 'moment';
import { env } from '../../env';

export const requestHandler = (
  func: RequestFunction,
  middlewares: Array<MiddlewareFunc>
) => {
  return (req: Request, res: Response<any>) => {
    const canceller = new Subject<void>();
    res.on('close', () => {
      if (res.writable) {
        canceller.next();
      }
      canceller.complete();
    });

    const timeoutDuration = env('TIMEOUTDURATION');
    const errorObj: ErrorResponseModel[] = [];
    const uuid = randomUUID();
    const startTime = moment();
    console.log(
      `[${moment().format('YYYY-MM-DD HH:mm:ss')}] [${uuid}] Request: ${req.method} ${req.url};`
    );
    return of(null)
      .pipe(
        map(() => {
          const params: RequestFunctionParams = {
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
        switchMap((params: RequestFunctionParams) => {
          return func(params, errorObj);
        }),
        timeout(timeoutDuration),
        catchError(e => {
          let responseObj: ResponseModelModel;
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
              body: errorObj[0],
            };
          } else if (e instanceof ErrorResponseModel) {
            errorObj.push({
              status: e.status ?? ErrorCode.BadRequest,
              message: e.message,
              name: e.name ?? ErrorType.BadRequest,
            });

            responseObj = {
              status: e.status,
              body: errorObj,
              success: false,
            };
          } else if (e instanceof ResponseModelModel) {
            responseObj = {
              status: e.status,
              body: e.body,
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
                status: ErrorCode.InternalServerError,
                body: errorObj,
                success: false,
              };
            } else {
              errorObj.push({
                name: ErrorType.InternalServerError,
                status: ErrorCode.InternalServerError,
                message: (e as any)?.message ?? 'Unknown Error',
              });
              responseObj = {
                status: ErrorCode.InternalServerError,
                body: errorObj,
                success: false,
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
        }),
        map((response: ResponseModelModel) => {
          res.status(response.status).json(response.body);
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
