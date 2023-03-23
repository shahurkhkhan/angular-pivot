import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponce } from 'src/app/core/interfaces/general.interface';
import { ApiRoutesService } from 'src/app/core/services/api-routes.service';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(
    private _api: ApiService,
    private _apiRoute: ApiRoutesService
  ) { }

  public getTestimonials(
    payload: any
  ): Observable<ApiResponce> {
    return this._api.get(
      this._apiRoute.url('CLIENT_TESTIMONIALS'),
      {
        params: payload
      }
    )
  }
}
