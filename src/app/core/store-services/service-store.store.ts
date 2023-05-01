import { ComponentStore } from '@ngrx/component-store';
import { filter, map, Observable, switchMapTo } from 'rxjs';
import {
  ActionSelector
} from '../interfaces/general.interface';

interface IUseActionPayload {
  statusKey: string;
  moduleKey: any;
  datakey: string;
}

export class ServiceStore<T> extends ComponentStore<any> {
  constructor(defaultState: T) {
    super(defaultState);
  }

  // State
  public moduleState<K extends keyof T>(key: K | undefined) {
    return this.select((state: T) => (key ? state[key] : state));
  }

  // Selector
  public useSelector = <T>(criteria: IUseActionPayload) => {
    const { statusKey, moduleKey, datakey } = criteria;
    const selector = {} as ActionSelector<T>;
    selector.state$ = this.moduleState(moduleKey);
    selector.data$ = this.moduleState(moduleKey).pipe(
      map((state: any) =>
        state?.hasOwnProperty(datakey) ? state[datakey] : null
      )
    );
    selector.isDone$ = this.moduleState(moduleKey).pipe(
      map((state: any) =>
        state?.status?.hasOwnProperty(datakey) ? state?.status[datakey] : null
      ),
      map(
        (status) =>
          status === `${statusKey}RequestSuccess` ||
          status === `${statusKey}RequestFailed`
      )
    );
    selector.isSend$ = this.moduleState(moduleKey).pipe(
      map((state: any) =>
        state?.status?.hasOwnProperty(datakey) ? state?.status[datakey] : null
      ),
      map((status) => status === `${statusKey}RequestSent`)
    );
    selector.isAgain$ = this.moduleState(moduleKey).pipe(
      map((state: any) =>
        state?.status?.hasOwnProperty(datakey) ? state?.status[datakey] : null
      ),
      map((status) => status === `${statusKey}RequestSentAgain`)
    );
    selector.isFailed$ = this.moduleState(moduleKey).pipe(
      map((state: any) =>
        state?.status?.hasOwnProperty(datakey) ? state?.status[datakey] : null
      ),
      map((status) => status === `${statusKey}RequestFailed`)
    );
    selector.isSuccess$ = this.moduleState(moduleKey).pipe(
      map((state: any) =>
        state?.status?.hasOwnProperty(datakey) ? state?.status[datakey] : null
      ),
      map((status) => status === `${statusKey}RequestSuccess`)
    );
    selector.errorMsg$ = selector.isFailed$.pipe(
      filter((d) => !!d),
      switchMapTo(
        this.moduleState(moduleKey).pipe(
          map((state: any) =>
            state?.errorMessage?.hasOwnProperty(datakey)
              ? state?.errorMessage[datakey]
              : null
          )
        )
      ),
      filter((d) => !!d)
    );
    selector.successMsg$ = selector.isSuccess$.pipe(
      filter((d) => !!d),
      switchMapTo(
        this.moduleState(moduleKey).pipe(
          map((state: any) =>
            state?.successMessage?.hasOwnProperty(datakey)
              ? state?.successMessage[datakey]
              : null
          )
        )
      ),
      filter((d) => !!d)
    );
    return selector;
  };
}
