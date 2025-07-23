import { MiddlewareFunc } from '../models/endpoint-models.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Request, Response } from 'express';
import { ErrorResponse } from '../models/error.response';

export const facebookPostMiddleware: MiddlewareFunc = (
  req: Request,
  res: Response<any>
): Observable<null> => {
  return of(null).pipe(
    map(() => {
      const params = {
        ...req.query,
        ...req.params,
        ...req.body,
        headers: req.headers,
      };

      if (!Number.isNaN(Number(params.id))) {
        res.locals.id = params.id;
      } else {
        throw new ErrorResponse(400, 'Id is required');
      }
      return null;
    })
  );
};
