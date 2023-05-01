import { Observable } from "rxjs";

export interface ActionSelector<T> {
  state$: Observable<any>,
  data$: Observable<T>,
  isSend$: Observable<any>,
  isDone$: Observable<any>,
  isSuccess$: Observable<any>,
  successMsg$: Observable<any>,
  isFailed$: Observable<any>,
  errorMsg$: Observable<any>,
  isAgain$: Observable<boolean>,

  // paginator$: Observable<any>,
  // isFetching$: Observable<boolean>,
}

export interface ApiResponce {
    responseData: any,
    responseMessage: string,
    responseCode: number,
    responseSuccess?: any,
    responseStatus?: number
}

export interface IPaginator {
    filteredTotal: number; // Total Fitred records
    total: number; // Total records in db
    page: number; // Current page number
    limit: number; // Current per page limit
}
export interface NgRxState<T> {
    otherData: any;
    listData: T[],
    paginator: IPaginator;
    status: {
        getListStatus: string, // get list status
        [key: string]: any
    };
    successMessage: {
        getListStatus: string, // get list message
        [key: string]: any
    };
    errorMessage: {
        getListStatus: string, // get list message
        [key: string]: any
    };
    [key: string]: any
}
export interface NgRxFormState {
    data: any,
    status: {
        formStatus: string, // get list status
        [key: string]: any
    };
    successMessage: {
        formStatus: string, // get list message
        [key: string]: any
    };
    errorMessage: {
        formStatus: string, // get list message
        [key: string]: any
    };
    [key: string]: any
}
