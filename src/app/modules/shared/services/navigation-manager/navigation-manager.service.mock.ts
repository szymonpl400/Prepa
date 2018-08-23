import { EventEmitter, Injectable } from '@angular/core';

@Injectable()
export class NavigationManagerServiceMock {
    toggle = new EventEmitter;
}
