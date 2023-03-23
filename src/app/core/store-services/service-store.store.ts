import { ComponentStore } from '@ngrx/component-store';
import { filter, map, Observable, switchMapTo } from 'rxjs';
import { NgrxListSelector, NgRxState } from '../interfaces/general.interface';

export class ServiceStore<T> extends ComponentStore<any>{
    // List data
    public listData$: Observable<any[]> = this.select(({ listData }) => {
        return listData;
    });

    // Paginator
    public paginator$: Observable<any> = this.select(({ paginator }) => {
        return paginator;
    });

    // constructor
    constructor(
        defaultState: T
    ) {
        super(defaultState)
    }

    // Selectors
    public listSelector(): NgrxListSelector<T[]> {
        const selector$ = {} as NgrxListSelector<T[]>;
        selector$.getList$ = this.select(({ listData }) => listData);
        selector$.paginator$ = this.paginator$;
        selector$.isDone$ = this.select(({ status }) => status.getListStatus).pipe(
            map(status => status === 'listRequestSuccess' || status === 'listRequestFailed')
        );
        selector$.isSend$ = this.select(({ status }) => status?.getListStatus).pipe(
            map(status => status === 'listRequestSent')
        );
        selector$.isAgain$ = this.select(({ status }) => status?.getListStatus).pipe(
            map(status => status === 'listRequestSentAgain')
        );
        selector$.isFailed$ = this.select(({ status }) => status?.getListStatus).pipe(
            map(status => status === 'listRequestFailed')
        );
        selector$.isSuccess$ = this.select(({ status }) => status?.getListStatus).pipe(
            map(status => status === 'listRequestSuccess')
        );
        selector$.errorMsg$ = selector$.isFailed$.pipe(
            filter(d => !!d),
            switchMapTo(this.select(({ errorMessage }) => errorMessage?.getListStatus)),
            filter(d => !!d)
        );
        selector$.successMsg$ = selector$.isSuccess$.pipe(
            filter(d => !!d),
            switchMapTo(this.select(({ successMessage }) => successMessage?.getListStatus)),
            filter(d => !!d)
        );
        return selector$;
    }

    // Feature module
    public moduleStateUpdate<K extends keyof T>(moduleState: T[K] | any, key: K) {
      this.patchState((state) => ({
        ...state,
        [key]: {
          ...state[key],
          ...moduleState
        }
      }));
    }

    // ModuleState
    public moduleState<K extends keyof T> (key: K){
      return this.select((state: T) => state[key])
    }

    public moduleListSelector<K extends keyof T>(key: K) {
      const selector$ = {} as NgrxListSelector<any[]>;
        selector$.getList$ = this.moduleState(key).pipe(
         map((state: any) => state?.listData)
        )
        selector$.paginator$ = this.moduleState(key).pipe(
          map((state: any) => state?.paginator)
         );
        selector$.isDone$ = this.moduleState(key).pipe(
          map((state: any) => state?.status?.getListStatus),
          map(status => status === 'listRequestSuccess' || status === 'listRequestFailed')
        )
        selector$.isSend$ = this.moduleState(key).pipe(
          map((state: any) => state?.status?.getListStatus),
          map(status => status === 'listRequestSent')
        )
        selector$.isAgain$ = this.moduleState(key).pipe(
          map((state: any) => state?.status?.getListStatus),
          map(status => status === 'listRequestSentAgain')
        )
        selector$.isFailed$ = this.moduleState(key).pipe(
          map((state: any) => state?.status?.getListStatus),
          map(status => status === 'listRequestFailed')
        )
        selector$.isSuccess$ = this.moduleState(key).pipe(
          map((state: any) => state?.status?.getListStatus),
          map(status => status === 'listRequestSuccess')
        )
        selector$.errorMsg$ = selector$.isFailed$.pipe(
            filter(d => !!d),
            switchMapTo(
              this.moduleState(key).pipe(
                map((state: any) => state?.errorMessage?.getListStatus)
              )
            ),
            filter(d => !!d)
        );
        selector$.successMsg$ = selector$.isSuccess$.pipe(
            filter(d => !!d),
            switchMapTo(
              this.moduleState(key).pipe(
                map((state: any) => state?.successMessage?.getListStatus)
              )
            ),
            filter(d => !!d)
        );
        return selector$;
    }
}
