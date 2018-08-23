import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HttpMethod } from '../../interfaces/http-method';
import { HttpOptions } from '../../interfaces/http-options';
import { AuthQueueRequest } from '../../interfaces/auth-queue-request';
import { HttpGetServiceMock } from '../http-get/http-get.service.mock';

@Injectable()
export class AuthQueueServiceMock {

    addRequest(request: AuthQueueRequest) {}

    releaseRequests(): AuthQueueRequest[] {
        return [this.createRequest(new HttpGetServiceMock, 'mockUrl', {})];
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
