import { Observable } from "rxjs";

export interface StateSelector {
    data$: Observable<any>,
    isSend$: Observable<any>,
    isDone$: Observable<any>,
    isSuccess$: Observable<any>,
    successMsg$: Observable<any>,
    isFailed$: Observable<any>,
    errorMsg$: Observable<any>,
}
export interface NgrxListSelector<T> {
    getList$: Observable<T>,
    isSend$: Observable<boolean>,
    paginator$: Observable<any>,
    isFetching$: Observable<boolean>,
    isDone$: Observable<boolean>,
    isFailed$: Observable<boolean>,
    isSuccess$: Observable<boolean>,
    isAgain$: Observable<boolean>,
    successMsg$: Observable<any>,
    errorMsg$: Observable<any>,
}

export interface NgrxFormSelector {
    data$: Observable<any>,
    isSend$: Observable<boolean>,
    isDone$: Observable<boolean>,
    isFailed$: Observable<boolean>,
    isSuccess$: Observable<boolean>,
    successMsg$: Observable<any>,
    errorMsg$: Observable<any>,
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
