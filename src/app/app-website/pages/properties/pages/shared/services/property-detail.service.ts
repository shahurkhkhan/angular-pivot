import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponce } from 'src/app/core/interfaces/general.interface';
import { ApiRoutesService } from 'src/app/core/services/api-routes.service';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyDetailService {

  constructor(
    private _api: ApiService,
    private _apiRoute: ApiRoutesService
  ) { }

  public getProperty(
    id: string,
    payload: any
  ): Observable<ApiResponce> {
    return this._api.get(
      `${this._apiRoute.url('PROPERTIES')}/${id}`,
      {
        params: payload
      }
    )
  }

  public getMarkets(
    payload: any
  ): Observable<ApiResponce> {
    return this._api.get(
      `${this._apiRoute.url('MICRO_MARKETS')}`,
      {
        params: payload
      }
    )
  }

}
