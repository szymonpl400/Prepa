import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthCredential } from '../../interfaces/auth-credential';

@Injectable()
export class AuthService {
    readonly accessTokenName = 'access_token';
    readonly expiresInName = 'expires_in';

    constructor(private http: HttpClient) { }

    private isValidToken(): boolean {
        return !!this.getToken();
    }

    private isValidTokenDate(): boolean {
        const expirationDateText = JSON.parse(localStorage.getItem(this.expiresInName));
        if (!expirationDateText) {
            return false;
        }
        const expirationDate = new Date(expirationDateText);
        const dateNow = new Date();
        return dateNow < expirationDate;
    }

    isAuthorized(): boolean {
        return this.isValidToken() && this.isValidTokenDate();
    }

    authorize(): Observable<AuthCredential> {
        return this.http.get('/auth')
            .pipe(map(data => {
            const expiresIn = new Date();
            expiresIn.setSeconds(new Date().getSeconds() + data['expiresIn']);
            return Object.assign({}, data, { expiresIn });
            })) as Observable<AuthCredential>;
    }

    saveCredential(credential: AuthCredential): void {
        localStorage.setItem(this.accessTokenName, credential.accessToken);
        localStorage.setItem(this.expiresInName, JSON.stringify(credential.expiresIn));
    }

    cleanCredential(): void {
        localStorage.removeItem(this.accessTokenName);
        localStorage.removeItem(this.expiresInName);
    }

    getToken(): string {
        return localStorage.getItem(this.accessTokenName);
    }
}
