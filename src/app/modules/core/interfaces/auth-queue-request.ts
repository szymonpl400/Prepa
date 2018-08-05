import { Subject } from 'rxjs';
import { HttpMethod } from '../interfaces/http-method';
import { HttpOptions } from './http-options';

export interface AuthQueueRequest {
    source: Subject<any>;
    url: string;
    options: HttpOptions;
    httpMethod: HttpMethod;
}
