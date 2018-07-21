import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

import { AuthService } from '../../services/auth/auth.service';
import { AuthCredentialModel } from '../auth/auth-credential.model';
import { AuthQueueService } from '../auth-queue/auth-queue.service';
import { AuthQueueRequestModel } from '../auth-queue/auth-queue-request.model';

@Injectable()
export class ApiService {
    private readonly apiBaseUrl = 'https://api.spotify.com/v1/';
    private isAuthRequestSent = false;

    constructor(
        private httpClient: HttpClient,
        private authService: AuthService,
        private authQueueService: AuthQueueService) { }

    get<T>(url: string): Observable<T> {
        return this.handleApiAuthorization(
            () => this.httpClient.get(this.apiBaseUrl + url, this.getHttpOptions())
        );
    }

    private handleApiAuthorization(apiRequest: () => Observable<any>): Observable<any> {
        if (this.authService.isAuthorized()) {
            return apiRequest();
        }
        const request = {
            source: new Subject,
            apiRequest
        };
        this.authQueueService.addRequest(request);
        if (!this.isAuthRequestSent) {
            this.authorize();
        }
        return request.source.asObservable();
    }

    private authorize(): void {
        this.isAuthRequestSent = true;
        this.authService.authorize()
            .subscribe((authCredential: AuthCredentialModel) => {
                this.isAuthRequestSent = false;

                if (!authCredential.success) {
                    throw new Error('Authorization failed!');
                }

                this.authService.saveCredential(authCredential);

                this.authQueueService.releaseRequests().forEach((req: AuthQueueRequestModel) => {
                    req.apiRequest()
                        .subscribe((result) => {
                            req.source.next(result);
                        });
                });
            });
    }

    private getHttpOptions() {
        return {
            headers: new HttpHeaders({
                'Authorization': 'Bearer ' + this.authService.getToken()
            })
        };
    }
}
