import { TestBed, getTestBed } from '@angular/core/testing';

import { TypeHelperService } from './type-helper.service';

describe('TypeHelperService', () => {
    let service: TypeHelperService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [TypeHelperService]
        });

        const injector = getTestBed();
        service = injector.get(TypeHelperService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('isNumber', () => {
        it('should return true for number', () => {
            const numbers = [0, -1, Number.MAX_SAFE_INTEGER, Number.MAX_VALUE, Number.MIN_SAFE_INTEGER, Number.MIN_VALUE];
            numbers.forEach((num: number) => {
                expect(service.isNumber(num)).toBeTruthy();
            });
        });

        it('should return false for non-number structures', () => {
            const structures = [NaN, undefined, null, [], {}, '', true, false];
            structures.forEach((structure) => {
                expect(service.isNumber(structure)).toBeFalsy();
            });
        });
    });
});
