import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpOptions } from '../../interfaces/http-options';

@Injectable()
export class ApiServiceMock {
    get<T>(url: string, options: HttpOptions = {}): Observable<T> {
        return new Observable;
    }

    post<T>(url: string, options: HttpOptions = {}): Observable<T> {
        return new Observable;
    }

    put<T>(url: string, options: HttpOptions = {}): Observable<T> {
        return new Observable;
    }

    delete<T>(url: string, options: HttpOptions = {}): Observable<T> {
        return new Observable;
    }
}
