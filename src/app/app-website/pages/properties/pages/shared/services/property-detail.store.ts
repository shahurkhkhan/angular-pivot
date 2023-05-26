import { Injectable } from '@angular/core';
import {
  Observable,
  delay,
  switchMap,
  tap,
} from 'rxjs';
import {
  NgRxState,
} from 'src/app/core/interfaces/general.interface';
import { ServiceStore } from 'src/app/core/store-services/service-store.store';
import { IProperty } from 'src/app/core/interfaces/property.interface';
import { PropertyDetailService } from './property-detail.service';
import { IMicroMarket } from 'src/app/app-website/pages/home/shared/interfaces/micro-market.interface';
import { PropertyService } from 'src/app/app-website/common-components/property-section/shared/services/property.service';

export interface IPropertyState {
  properties: NgRxState<IProperty>;
  microMarkets: NgRxState<IMicroMarket>;
}

@Injectable()
export class PropertyDetailStore extends ServiceStore<NgRxState<IProperty>> {
  // constructor
  constructor(
    private _propertyDetailService: PropertyDetailService,
    private _propertyService: PropertyService
  ) {
    super({} as NgRxState<IProperty>);
  }
  // @Effects
  readonly getProperty = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap(() => {
        this.patchState((state) => ({
          ...state,
          properties: {
            ...state.properties,
            status: {
              ...state.properties?.status,
              detail: 'detailRequestSent',
            },
          },
        }));
      }),
      switchMap((payload) => {
        return this._propertyDetailService.getProperty(payload, {}).pipe(
          tap(({ responseData, responseStatus }) => {
            const isError = responseStatus !== 200;
            this.patchState((state) => ({
              ...state,
              properties: {
                ...state.properties,
                detail: responseData,
                status: {
                  ...state.properties?.status,
                  detail: isError
                    ? 'detailRequestFailed'
                    : 'detailRequestSuccess',
                },
              },
            }));
          })
        );
      })
    );
  });
  readonly getProperties = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap((payload) => {
        this.patchState((state) => {
          return {
            ...state,
            properties: {
              ...state.properties,
              list: [],
              status: {
                ...state.properties?.status,
                list: 'listRequestSent',
              },
            },
          };
        });
      }),
      switchMap((payload) => {
        return this._propertyService.getProperties(payload).pipe(
          tap(({ responseData, responseStatus, responseSuccess }) => {
            const isError = responseStatus !== 200;
            this.patchState((state) => ({
              ...state,
              properties: {
                ...state.properties,
                list: responseSuccess ? responseData?.data?.data : [],
                status: {
                  ...state.properties.status,
                  list: isError ? 'listRequestFailed' : 'listRequestSuccess',
                },
              },
            }));
          })
        );
      })
    );
  });

  readonly getMicroMarkets = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap(() => {
        this.patchState((state) => {
          return {
            ...state,
            microMarkets: {
              status: {
                list: 'listRequestSent',
              },
            },
          };
        });
      }),
      switchMap((payload) => {
        return this._propertyDetailService
          .getMarkets(payload.query)
          .pipe(
            tap(({ responseData, responseStatus }) => {
              const isError = responseStatus !== 200;
              this.patchState((state) => {
                return {
                  ...state,
                  microMarkets: {
                    ...state.microMarkets,
                    list: responseData?.data ?? [],
                    status: {
                      list: isError
                        ? 'listRequestFailed'
                        : 'listRequestSuccess',
                    },
                  },
                };
              });
            })
          );
      })
    );
  });
  // selectors
  public get getPropertySelector() {
    return this.useSelector<IProperty>({
      datakey: 'detail',
      statusKey: 'detail',
      moduleKey: 'properties',
    });
  }
  public get getPropertiesSelector() {
    return this.useSelector<IProperty[]>({
      datakey: 'list',
      statusKey: 'list',
      moduleKey: 'properties',
    });
  }
  public get getMicroMarketsSelector() {
    return this.useSelector<IMicroMarket[]>({
      datakey: 'list',
      statusKey: 'list',
      moduleKey: 'microMarkets',
    });
  }
}
