import { Injectable } from '@angular/core';

import { AuthQueueRequestModel } from './auth-queue-request.model';

@Injectable()
export class AuthQueueService {
    private requests: AuthQueueRequestModel[] = [];

    addRequest(request: AuthQueueRequestModel) {
        this.requests.push(request);
    }

    releaseRequests(): AuthQueueRequestModel[]  {
        return this.requests.splice(0, this.requests.length);
    }
}
