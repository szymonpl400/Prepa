import { Injectable } from '@angular/core';

@Injectable()
export class DateHelperService {
    secondsToMiliseconds(seconds: number) {
        return seconds * 1000;
    }
}
