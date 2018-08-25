import { Injectable } from '@angular/core';

@Injectable()
export class TypeHelperService {
    isNumber(n: any): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
}
