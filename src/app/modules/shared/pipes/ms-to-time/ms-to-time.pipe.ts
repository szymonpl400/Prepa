import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'msToTime'
})
export class MsToTimePipe implements PipeTransform {

    transform(miliseconds: number): string {
        const seconds = miliseconds / 1000;
        const timeMinutes = Math.floor(seconds / 60);
        const timeSeconds = Math.floor(seconds % 60);
        return `${timeMinutes}:${timeSeconds < 10 ? '0' + timeSeconds : timeSeconds}`;
    }
}
