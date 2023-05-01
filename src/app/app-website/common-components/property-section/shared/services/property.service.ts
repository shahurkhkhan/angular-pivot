import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponce } from 'src/app/core/interfaces/general.interface';
import { ApiRoutesService } from 'src/app/core/services/api-routes.service';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private _api: ApiService,
    private _apiRoute: ApiRoutesService
  ) { }

  public getProperties(
    payload: any
  ): Observable<ApiResponce> {
    return this._api.get(
      this._apiRoute.url('PROPERTIES'),
      {
        params: payload
      }
    )
  }

  public getSiteStatic(
    payload: any
  ): Observable<ApiResponce> {
    return this._api.get(
      this._apiRoute.url('PROPERTY_STATIC_DATA'),
      {
        params: payload
      }
    )
  }


  public getMicroMarkets(
    locationId: string,
    payload: any
  ): Observable<ApiResponce> {
    return this._api.get(
      `${this._apiRoute.url('LOCATIONS')}/${locationId}/market`,
      {
        params: payload
      }
    )
  }

  public getLocations(
    payload: any
  ): Observable<ApiResponce> {
    return this._api.get(
      this._apiRoute.url('LOCATIONS'),
      {
        params: payload
      }
    )
  }
}
