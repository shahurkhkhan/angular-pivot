import { Injectable } from "@angular/core";
import { delay, Observable, switchMap, tap } from "rxjs";
import { NgRxState } from "src/app/core/interfaces/general.interface";
import { ServiceStore } from "src/app/core/store-services/service-store.store";
import { ITestimonial } from "../interfaces/testimonial.interface";
import { HomeService } from "../services/home.service";

// State
export interface IHomeState  {
  testimonials: NgRxState<ITestimonial>
}

@Injectable()
export class HomeStore extends ServiceStore<IHomeState> {
  public testimonialsState$ = this.moduleState('testimonials');
    // constructor
  constructor(
      private _homeService: HomeService
  ) {
      super({} as IHomeState)
  }
      // @Effects
    readonly getTestimonial = this.effect((trigger$: Observable<any>) => {
        return trigger$.pipe(
            tap(() => {
                this.testimonials({

                  status: {
                      getListStatus: 'listRequestSent'
                  }
                } as NgRxState<ITestimonial>);
            }),
            delay(2000),
            switchMap((payload) => {
                return this._homeService.getTestimonials(payload).pipe(
                    tap(({ responseData, responseStatus }) => {
                        const isError = responseStatus !== 200;
                        this.testimonials({
                          listData: responseData.data,
                            status: {
                                getListStatus: isError ? 'listRequestFailed' : 'listRequestSuccess'
                            }
                        }  as NgRxState<ITestimonial>)
                    })
                )
            }),
        )
    })

    public testimonials (testimonialState: NgRxState<ITestimonial>) {
      this.moduleStateUpdate(testimonialState, 'testimonials')
    }
}
