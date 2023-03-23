import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiRoutesService {
  constructor() {}

  /**
   * @description this function use for get base url of apis
   * @returns : string
   */
  public baseUrl(): string {
    return `${environment.ASSETS_BASE_URL}`;
  }

  /**
   *
   * @param queryString
   * @returns
   */
  public url<T extends keyof typeof environment.ROUTES_CONFIG>(
    moduleName: T
  ): string {
    return `${environment.API_BASE_URL}${environment.ROUTES_CONFIG[moduleName]}`;
  }

}
