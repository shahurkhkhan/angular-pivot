import { Injectable } from '@angular/core';
import { Observable, delay, filter, map, switchMap, switchMapTo, tap } from 'rxjs';
import { ActionSelector, NgRxState } from 'src/app/core/interfaces/general.interface';
import { ServiceStore } from 'src/app/core/store-services/service-store.store';
import { IProperty } from 'src/app/core/interfaces/property.interface';
import { PropertyDetailService } from './property-detail.service';


@Injectable({
  providedIn: 'root'
})
export class PropertyDetailStore extends ServiceStore<NgRxState<IProperty>> {
  // constructor
  constructor(private _propertyDetailService: PropertyDetailService) {
    super({} as NgRxState<IProperty>);
  }
  // @Effects
  readonly getProperty = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap(() => {
        this.patchState((state) => ({
          ...state,
          status: {
            detail: 'detailRequestSent',
          },
        }))
      }),
      switchMap((payload) => {
        return this._propertyDetailService.getProperty(payload, {}).pipe(
          tap(({ responseData, responseStatus }) => {
            const isError = responseStatus !== 200;
            this.patchState((state) => ({
              ...state,
              detail: responseData.data,
              status: {
                detail:  isError
                ? 'detailRequestFailed'
                : 'detailRequestSuccess',
              },
            }))
          })
        );
      })
    );
  });
  // selectors
}
