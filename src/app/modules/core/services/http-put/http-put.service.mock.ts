import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpMethod } from '../../interfaces/http-method';
import { HttpOptions } from '../../interfaces/http-options';

@Injectable()
export class HttpPutServiceMock implements HttpMethod {
    request<T>(url: string, options?: HttpOptions): Observable<T> {
        return new Observable;
    }
}
