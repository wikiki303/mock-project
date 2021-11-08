import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { LogLevel } from './logger.service';

export interface ApiOption {
  headers?: HttpHeaders;
  observe?: 'body';
  params?: HttpParams;
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

export interface AppSettings {
  authSettings?: any;
  loglevel?: LogLevel;
  api_url: string;
  signalr_url?: string;
  apiCacheTimeout?: number;
}

export interface ApiRequest {
  data?: any;
  rowVersion?: string;
  recordState?: string;
}

@Injectable()
export class ApiService {
  public baseApiUrl: string = environment.API_URL;
  private contentType = environment.CONTENT;

  private isCheckTokenManual = false;

  constructor(
    protected httpclient: HttpClient,
    private injector: Injector
  ) {
  }

  /**
   *call api with POST end point
   * Example apiService.postEndPoint(data, '/delete-cart')
   *
   * @template T
   * @param {*} value
   * @param {string} path
   * @return {*}  {Observable<T>}
   * @memberof ApiService
   */
  public postEndPoint<T>(value: any, path: string): Observable<T> {
    const url = this.baseApiUrl + path;

    return this.httpclient.post<T>(url, value).pipe<T, T>(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleError(error, () => this.postEndPoint(value, url));
      })
    );
  }

  /**
   *call api with PUT end point
   * Example apiService.putEndPoint(data, '/delete-cart')
   *
   * @template T
   * @param {*} value
   * @param {string} path
   * @return {*}  {Observable<T>}
   * @memberof ApiService
   */
   public putEndPoint<T>(value: any, path: string): Observable<T> {
    const url = this.baseApiUrl + path;

    return this.httpclient.put<T>(url, value).pipe<T, T>(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return this.handleError(error, () => this.postEndPoint(value, url));
      })
    );
  }

  /**
   * call api with DELETE end point
   * Example 
   *  deleteUrl = '/delete-cart/id'
   *  apiService.deleteEndPoint(deleteUrl)
   *
   * @template T
   * @param {*} endpointUrl
   * @return {*}  {Observable<T>}
   * @memberof ApiService
   */
   public deleteEndPoint<T>(endpointUrl: any, value: any): Observable<T> {
    const url = this.baseApiUrl + endpointUrl;
    let headers: HttpHeaders = new HttpHeaders();
    headers = this.setContentType(headers, this.contentType);

    return this.httpclient.delete<T>(url, {headers, body: JSON.stringify(value)}).pipe<T, T>(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        if (this.isCheckTokenManual) {
          return throwError(error);
        } else {
          return this.handleError(error, () => this.getEndPoint(url));
        }
      })
    );
  }

  /**
   * GET end point
   * 
   * Example 
   *  deleteUrl = '/delete-cart/id'
   *  apiService.getEndPoint(deleteUrl)
   *
   * @template T
   * @param {*} endpointUrl
   * @return {*}  {Observable<T>}
   * @memberof ApiService
   */
  public getEndPoint<T>(endpointUrl: any): Observable<T> {
    const url = this.baseApiUrl + endpointUrl;
    return this.httpclient.get<T>(url, this.getRequestHeaders()).pipe<T, T>(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        if (this.isCheckTokenManual) {
          return throwError(error);
        } else {
          return this.handleError(error, () => this.getEndPoint(url));
        }
      })
    );
  }

  /**
   *handle error when call api
   *
   * @protected
   * @param {*} error
   * @param {() => Observable<any>} continuation
   * @return {*}
   * @memberof ApiService
   */
  protected handleError(error: any, continuation: () => Observable<any>) {
    const exception = error.error;
    return throwError(exception);
  }

  /**
   *set content for header
   *
   * @private
   * @param {HttpHeaders} headers
   * @param {string} contentType
   * @return {*}  {HttpHeaders}
   * @memberof ApiService
   */
  private setContentType(headers: HttpHeaders, contentType: string): HttpHeaders {
    headers = headers.set('Content-Type', contentType);
    return headers;
  }

  /**
   *validate format of json
   *
   * @private
   * @param {*} value
   * @return {*}  {string}
   * @memberof ApiService
   */
  private validateFormatJSon(value: any): string {
    return JSON.stringify(value);
  }

  /**
   *get request header
   *
   * @protected
   * @return {*}  {({ headers: HttpHeaders | { [header: string]: string | string[] } })}
   * @memberof ApiService
   */
  protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[] } } {
    let headers = new HttpHeaders({
      Accept: `application/json, text/plain, */*`,
      'App-Version': '1.0.0.0',
      'Access-Control-Allow-Origin': '*',
    });
    headers = this.setContentType(headers, this.contentType);
    return { headers: headers };
  }
}
