import { HttpResponse } from "@angular/common/http";
import { catchError, map, Observable, of, shareReplay } from "rxjs";
import { ApiResponce } from "../interfaces/general.interface";

export default function apiResponse() {
      return (source: Observable<any>) => {
            return source.pipe(
                  map((res: HttpResponse<ApiResponce>) => {
                        return {
                              ...res.body,
                              responseData: res.body,
                              responseStatus: res.status,
                              responseSuccess: true
                        }
                  }),
                  catchError(e => {
                        const apiErrorHandler = {
                              ...e.error,
                              responseSuccess: false,
                              responseStatus: e.status
                        }
                        if (e.error instanceof ProgressEvent) {
                              apiErrorHandler.responseCode = 0;
                              apiErrorHandler.responseMessage = e.error.message;
                              apiErrorHandler.responseData = 0;
                        }
                        console.log('apiErrorHandler', e.error)
                        return of(apiErrorHandler)
                  }),
                  shareReplay()
            )
      }
}
