import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthCredential } from '../../interfaces/auth-credential';
import { DateHelperService, TypeHelperService } from '../../../shared/shared.module';

@Injectable()
export class AuthService {
    readonly accessTokenName = 'access_token';
    readonly expiresInName = 'expires_in';

    constructor(
        private http: HttpClient,
        private dateHelper: DateHelperService,
        private typeHelper: TypeHelperService
    ) { }

    isAuthorized(): boolean {
        return this.isValidToken() && !this.tokenExpired();
    }

    authorize(): Observable<AuthCredential> {
        return this.http.get('/auth').pipe(
            map((data: AuthCredential) => {
                const expiresIn = Date.now() + this.dateHelper.secondsToMiliseconds(data.expiresIn);
                return Object.assign({}, data, { expiresIn });
            })
        );
    }

    saveCredentials(credential: AuthCredential): void {
        localStorage.setItem(this.accessTokenName, credential.accessToken);
        localStorage.setItem(this.expiresInName, JSON.stringify(credential.expiresIn));
    }

    clearCredentials(): void {
        localStorage.removeItem(this.accessTokenName);
        localStorage.removeItem(this.expiresInName);
    }

    getToken(): string {
        return localStorage.getItem(this.accessTokenName);
    }

    private isValidToken(): boolean {
        return !!this.getToken();
    }

    private tokenExpired(): boolean {
        const expiresIn: number = JSON.parse(localStorage.getItem(this.expiresInName));
        if (!this.typeHelper.isNumber(expiresIn)) {
            return true;
        }
        return Date.now() > expiresIn;
    }
}
