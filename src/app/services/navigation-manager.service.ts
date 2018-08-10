import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavigationManagerService {
    toggle = new EventEmitter;
}
