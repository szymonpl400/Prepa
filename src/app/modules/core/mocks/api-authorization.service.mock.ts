import { Observable } from 'rxjs';

import { HttpMethod } from '../interfaces/http-method';
import { HttpOptions } from '../interfaces/http-options';

export class ApiAuthorizationServiceMock {
    handle(httpMethod: HttpMethod, url: string, options?: HttpOptions): Observable<any> {
        return new Observable;
    }
}
