import {
  RequestFunction,
  RequestFunctionParams,
} from '../models/endpoint-models.model';
import { ErrorResponseModel } from '../models/error-response.model';
import { Observable, of } from 'rxjs';
import { ResponseModel } from '../models/response.model';
export class FacebookPostParams {
  id: string;
}
export const getFacebookPostEndpoint: RequestFunction<
  FacebookPostParams,
  FacebookPostParams
> = (
  paramsObj: RequestFunctionParams<FacebookPostParams>,
  errorList: ErrorResponseModel[],
  locals: FacebookPostParams
): Observable<ResponseModel> => {
  return of({
    data: {
      postId: paramsObj.id,
    },
    success: true,
  });
};
