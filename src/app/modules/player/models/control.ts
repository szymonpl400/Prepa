import { Subject } from 'rxjs';

export class Control {
    private _active = false;
    activeChanged = new Subject<boolean>();

    get active(): boolean {
        return this._active;
    }
    set active(value: boolean) {
        this._active = value;
        this.activeChanged.next(value);
    }

    disabled = false;
}
