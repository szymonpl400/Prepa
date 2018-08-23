import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpMethod } from '../../interfaces/http-method';
import { HttpOptions } from '../../interfaces/http-options';

@Injectable()
export class ApiAuthorizationServiceMock {
    handle(httpMethod: HttpMethod, url: string, options?: HttpOptions): Observable<any> {
        return new Observable;
    }
}
