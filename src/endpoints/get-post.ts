import {
  RequestFunction,
  RequestFunctionParams,
} from '../models/endpoint-models.model';
import { ErrorResponse } from '../models/errorResponse';
import { Observable, of } from 'rxjs';
import { ResponseModel } from '../models/response.model';
export class FacebookPostParams {
  id: string;
}
export const getFacebookPostEndPoint: RequestFunction<
  FacebookPostParams,
  FacebookPostParams
> = (
  paramsObj: RequestFunctionParams<FacebookPostParams>,
  errorObj: ErrorResponse[],
  locals: FacebookPostParams
): Observable<ResponseModel> => {
  return of({
    data: {
      postId: paramsObj.id,
    },
    success: true,
  });
};
