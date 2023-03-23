import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import apiResponse from '../operators/api-response';
import { Observable } from 'rxjs';
import { ApiResponce } from '../interfaces/general.interface';

@Injectable({ providedIn: 'root' })
export class ApiService {
      constructor(
            private httpClient: HttpClient
      ) { }

      /**
       * Get Request
       * @param url : string
       * @param options : HTTPClient.get options
       * @returns Observable<HttpResponse<ApiResponce>>
       */
      public get(
            url: string,
            options?: any
      ): Observable<ApiResponce> {
            return this.httpClient.get(url, {
                  observe: 'response' as any,
                  ...options
            }).pipe(
                  apiResponse()
            )
      }

      /**
       * Post Request
       * @param url : string
       * @param options : HTTPClient.get options
       * @param body : any payload
       * @returns Observable<HttpResponse<ApiResponce>>
       */
      public post(
            url: string,
            body: any,
            options?: any
      ): Observable<ApiResponce> {
            return this.httpClient.post(url, body, {
                  observe: 'response' as any,
                  ...options
            }).pipe(
                  apiResponse()
            )
      }

/**
 * Post Request
 * @param url : string
 * @param options : HTTPClient.get options
 * @param body : any payload
 * @returns Observable<HttpResponse<ApiResponce>>
 */
    public put(
            url: string,
            body: any,
            options?: any
    ): Observable<ApiResponce> {
            return this.httpClient.put(url, body, {
                observe: 'response' as any,
                ...options
            }).pipe(
                apiResponse()
            )
    }

/**
* Patch Request
* @param url : string
* @param options : HTTPClient.patch options
* @param body : any payload
* @returns Observable<HttpResponse<ApiResponce>>
*/
    public patch(
        url: string,
        body: any,
        options?: any
    ): Observable<ApiResponce> {
        return this.httpClient.patch(url, body, {
                observe: 'response' as any,
                ...options
        }).pipe(
                apiResponse()
        )
    }
}
