import { Injectable } from '@angular/core';
import { delay, Observable, switchMap, tap } from 'rxjs';
import { NgRxState } from 'src/app/core/interfaces/general.interface';
import { ServiceStore } from 'src/app/core/store-services/service-store.store';
import { ITestimonial } from '../interfaces/testimonial.interface';
import { HomeService } from '../services/home.service';
import { ILocation, IMicroMarket } from '../interfaces/micro-market.interface';

// State
export interface IHomeState {
  testimonials: NgRxState<ITestimonial>;
  microMarkets: NgRxState<IMicroMarket>;
  locations: NgRxState<ILocation>;
}

@Injectable()
export class HomeStore extends ServiceStore<IHomeState> {
  // constructor
  constructor(private _homeService: HomeService) {
    super({} as IHomeState);
  }
  // @Effects
  readonly getTestimonial = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap(() => {
        this.patchState((state) => ({
          ...state,
          testimonials: {
            ...state.testimonials,
            status: {
              list: state.testimonials?.list?.length ? 'listRequestSentAgain' : 'listRequestSent',
            }
          }
        }))
      }),
      switchMap((payload) => {
        return this._homeService.getTestimonials(payload).pipe(
          tap(({ responseData, responseStatus }) => {
            const isError = responseStatus !== 200;
            this.patchState((state) => ({
              ...state,
              testimonials: {
                ...state.testimonials,
                list: responseData?.data,
                status: {
                  list: isError
                  ? 'listRequestFailed'
                  : 'listRequestSuccess',
                }
              }
            }))
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
                list: state.microMarkets?.list?.length ? 'listRequestSentAgain' : 'listRequestSent',
              }
            }
          }
        })
      }),
      switchMap((payload) => {
        return this._homeService.getMicroMarkets(payload.locationId, payload.query).pipe(
          tap(({ responseData, responseStatus }) => {
            const isError = responseStatus !== 200;
            this.patchState((state) => {
              return {
                ...state,
                microMarkets: {
                  ...state.microMarkets,
                  list: responseData?.data ?? [],
                  status: {
                    list: isError ? 'listRequestFailed' : 'listRequestSuccess',
                  }
                }
              }
            })
          })
        );
      }),
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
                list: state.locations?.list?.length ? 'listRequestSentAgain' : 'listRequestSent',
              }
            }
          }
        })
      }),
      switchMap((payload) => {
        return this._homeService.getLocations(payload).pipe(
          tap(({ responseData, responseStatus }) => {
            const isError = responseStatus !== 200;
            this.patchState((state) => {
              return {
                ...state,
                locations: {
                  ...state.locations,
                  list: responseData?.data,
                  status: {
                    list: isError
                      ? 'listRequestFailed'
                      : 'listRequestSuccess',
                  },
                }
              }
            })
          })
        );
      })
    );
  });
}
