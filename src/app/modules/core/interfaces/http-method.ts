import { Observable } from 'rxjs';

import { HttpOptions } from '../interfaces/http-options';

export interface HttpMethod {
    request<T>(url: string, options?: HttpOptions): Observable<T>;
}
