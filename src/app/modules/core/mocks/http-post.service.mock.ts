import { Observable } from 'rxjs';

import { HttpMethod } from '../interfaces/http-method';
import { HttpOptions } from '../interfaces/http-options';

export class HttpPostServiceMock implements HttpMethod {
    request<T>(url: string, options?: HttpOptions): Observable<T> {
        return new Observable;
    }
}
