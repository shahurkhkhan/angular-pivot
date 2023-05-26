import { Injectable } from '@angular/core';
import { Observable, delay, map, pluck, switchMap, tap } from 'rxjs';
import { NgRxState } from 'src/app/core/interfaces/general.interface';
import { ServiceStore } from 'src/app/core/store-services/service-store.store';
import { PropertyService } from './property.service';
import {
  ILocation,
  IMicroMarket,
} from 'src/app/app-website/pages/home/shared/interfaces/micro-market.interface';
import { IProperty } from 'src/app/core/interfaces/property.interface';

// State
export interface IPropertyState {
  properties: NgRxState<IProperty>;
  staticData: NgRxState<any>;
  microMarkets: NgRxState<IMicroMarket>;
  locations: NgRxState<ILocation>;
}

@Injectable({
  providedIn: 'root',
})
export class PropertyStore extends ServiceStore<IPropertyState> {
  public filterPayload$ = this.moduleState('properties').pipe(pluck('otherData'), pluck('queryPayload'))
  // constructor
  constructor(private _propertyService: PropertyService) {
    super({} as IPropertyState);
  }
  // @Effects
  readonly getStaticData = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap(() => {
        this.patchState((state) => ({
          ...state,
          staticData: {
            ...state.staticData,
            status: {
              list: 'listRequestSent',
            },
          },
        }));
      }),
      switchMap((payload) => {
        return this._propertyService.getSiteStatic(payload).pipe(
          tap(({ responseData, responseStatus }) => {
            const isError = responseStatus !== 200;
            this.patchState((state) => ({
              ...state,
              staticData: {
                list: responseData?.data,
                status: {
                  list: isError ? 'listRequestFailed' : 'listRequestSuccess',
                },
              },
            }));
          })
        );
      })
    );
  });

  readonly getPropertiees = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap((payload) => {
        this.patchState((state) => {
          return {
            ...state,
            properties: {
              ...state.properties,
              otherData: {
                queryPayload: payload,
              },
              status: {
                list: state.properties?.list?.length
                  ? 'listRequestSentAgain'
                  : 'listRequestSent',
              },
            },
          };
        });
      }),
      delay(2000),
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
              ...state.microMarkets,
              status: {
                list: state.microMarkets?.list?.length
                  ? 'listRequestSentAgain'
                  : 'listRequestSent',
              },
            },
          };
        });
      }),
      switchMap((payload) => {
        return this._propertyService
          .getMicroMarkets(payload.locationId, payload.query)
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

  readonly getlocations = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap(() => {
        this.patchState((state) => {
          return {
            ...state,
            locations: {
              ...state.locations,
              status: {
                list: state.locations?.list?.length
                  ? 'listRequestSentAgain'
                  : 'listRequestSent',
              },
            },
          };
        });
      }),
      switchMap((payload) => {
        return this._propertyService.getLocations(payload).pipe(
          tap(({ responseData, responseStatus }) => {
            const isError = responseStatus !== 200;
            this.patchState((state) => {
              return {
                ...state,
                locations: {
                  ...state.locations,
                  list: responseData?.data,
                  status: {
                    list: isError ? 'listRequestFailed' : 'listRequestSuccess',
                  },
                },
              };
            });
          })
        );
      })
    );
  });
}
