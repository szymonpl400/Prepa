import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { HttpMethod } from '../../interfaces/http-method';
import { HttpOptions } from '../../interfaces/http-options';

@Injectable()
export class HttpPutService implements HttpMethod {

    constructor(private httpClient: HttpClient) {
    }

    request<T>(url: string, options?: HttpOptions): Observable<T> {
        return this.httpClient.put(url, options) as Observable<T>;
    }
}
