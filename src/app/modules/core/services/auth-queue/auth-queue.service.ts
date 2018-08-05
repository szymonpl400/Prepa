import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { AuthQueueRequest} from '../../interfaces/auth-queue-request';
import { HttpMethod } from '../../interfaces/http-method';
import { HttpOptions } from '../../interfaces/http-options';

@Injectable()
export class AuthQueueService {
    private requests: AuthQueueRequest[] = [];

    addRequest(request: AuthQueueRequest) {
        this.requests.push(request);
    }

    releaseRequests(): AuthQueueRequest[]  {
        return this.requests.splice(0, this.requests.length);
    }

    createRequest(httpMethod: HttpMethod, url: string, options?: HttpOptions): AuthQueueRequest {
        return {
            source: new Subject,
            url,
            options,
            httpMethod
        };
    }
}
