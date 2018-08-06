import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class NavigationManagerService {
    openedChange = new EventEmitter<boolean>();
}
