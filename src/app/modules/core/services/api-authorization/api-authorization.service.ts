import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../services/auth/auth.service';
import { AuthCredential } from '../../interfaces/auth-credential';
import { AuthQueueService } from '../auth-queue/auth-queue.service';
import { AuthQueueRequest } from '../../interfaces/auth-queue-request';
import { HttpMethod } from '../../interfaces/http-method';
import { HttpOptions } from '../../interfaces/http-options';

@Injectable()
export class ApiAuthorizationService {
    private isAuthorizationInProgress = false;

    constructor(
        private authService: AuthService,
        private authQueueService: AuthQueueService) { }

    handle(httpMethod: HttpMethod, url: string, options: HttpOptions = {}): Observable<any> {
        if (this.authService.isAuthorized()) {
            return this.makeHttpRequest(httpMethod, url, options);
        }
        const authQueueRequest = this.authQueueService.createRequest(httpMethod, url, options);
        this.handleNotAuthorized(authQueueRequest);
        return authQueueRequest.source.asObservable();
    }

    private authorize(): Observable<AuthCredential> {
        this.isAuthorizationInProgress = true;
        return this.authService.authorize().pipe(
                tap((authCredential: AuthCredential) => {
                    this.isAuthorizationInProgress = false;
                    if (!authCredential.success) {
                        throw new Error('Authorization failed!');
                    }
                    this.authService.saveCredential(authCredential);
                    return authCredential;
                })
            );
    }

    private handleNotAuthorized(authQueueRequest: AuthQueueRequest): void {
        this.authQueueService.addRequest(authQueueRequest);
        if (!this.isAuthorizationInProgress) {
            this.authorize().subscribe(() => {
                this.releaseRequestsWaitingForAuthorization();
            });
        }
    }

    private releaseRequestsWaitingForAuthorization(): void {
        this.authQueueService.releaseRequests().forEach((req: AuthQueueRequest) => {
            this.makeHttpRequest(req.httpMethod, req.url, req.options).subscribe((result) => {
                req.source.next(result);
                req.source.complete();
            });
        });
    }

    private addAuthToken(httpOptions: HttpOptions): HttpOptions {
        const authHeader = {
            Authorization: this.getAuthToken()
        };
        const headers = Object.assign({}, httpOptions.headers, authHeader);
        return Object.assign({}, httpOptions, { headers });
    }

    private getAuthToken(): string {
        return 'Bearer ' + this.authService.getToken();
    }

    private makeHttpRequest(httpMethod: HttpMethod, url: string, options: HttpOptions): Observable<any> {
        const optionsWithAuthToken = this.addAuthToken(options);
        return httpMethod.request(url, optionsWithAuthToken);
    }
}
