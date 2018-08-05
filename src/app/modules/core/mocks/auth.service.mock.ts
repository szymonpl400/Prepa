import { Observable } from 'rxjs';
import { AuthCredential } from '../interfaces/auth-credential';

export class AuthServiceMock {
    isAuthorized(): boolean {
        return false;
    }

    authorize(): Observable<AuthCredential> {
        return new Observable;
    }

    saveCredential() {}

    cleanCredential() {}

    getToken(): string {
        return '';
    }
}
