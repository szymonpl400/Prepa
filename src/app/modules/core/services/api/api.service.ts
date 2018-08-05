import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpMethodFactoryService } from '../http-method-factory/http-method-factory.service';
import { HttpMethodType } from '../../enums/http-method-type';
import { ApiAuthorizationService } from '../api-authorization/api-authorization.service';
import { HttpOptions } from '../../interfaces/http-options';
import { HttpMethod } from '../../interfaces/http-method';

@Injectable()
export class ApiService {
    readonly API_BASE_URL = 'https://api.spotify.com/v1/';

    constructor(
        private httpMethodFactory: HttpMethodFactoryService,
        private apiAuthorization: ApiAuthorizationService) { }

    get<T>(url: string, options: HttpOptions = {}): Observable<T> {
        const method = this.httpMethodFactory.create(HttpMethodType.Get);
        return this.handleApiAuthorization(method, url, options);
    }

    post<T>(url: string, options: HttpOptions = {}): Observable<T> {
        const method = this.httpMethodFactory.create(HttpMethodType.Post);
        return this.handleApiAuthorization(method, url, options);
    }

    put<T>(url: string, options: HttpOptions = {}): Observable<T> {
        const method = this.httpMethodFactory.create(HttpMethodType.Put);
        return this.handleApiAuthorization(method, url, options);
    }

    delete<T>(url: string, options: HttpOptions = {}): Observable<T> {
        const method = this.httpMethodFactory.create(HttpMethodType.Delete);
        return this.handleApiAuthorization(method, url, options);
    }

    private handleApiAuthorization<T>(method: HttpMethod, url: string, options: HttpOptions): Observable<T> {
        const urlWithBaseUrl = this.addApiBaseUrl(url);
        return this.apiAuthorization.handle(method, urlWithBaseUrl, options);
    }

    private addApiBaseUrl(url: string): string {
        return this.API_BASE_URL + url;
    }
}
