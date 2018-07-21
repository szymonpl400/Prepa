import { Subject, Observable } from 'rxjs';

export class AuthQueueRequestModel {
    source: Subject<any>;
    apiRequest: () => Observable<any>;
}
